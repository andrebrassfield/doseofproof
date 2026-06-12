#!/usr/bin/env node
/**
 * Phase 6.1 — Static OG image pre-render.
 *
 * For each top route, fetches the dynamic /api/og endpoint in a headless
 * Chromium (via Playwright) and saves the resulting PNG to
 * public/og/<slug>.png. Result: the first hit on the homepage, pillar
 * pages, and top articles gets a cached static image instead of paying
 * the next/og render cost.
 *
 * Usage:
 *   node scripts/render-og-images.mjs           # default: render all
 *   node scripts/render-og-images.mjs --dry    # list routes without rendering
 *
 * Requires the Next.js server to be running on BASE_URL (default
 * http://localhost:3000) OR a remote deployment URL passed via BASE_URL.
 */
import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.join(process.cwd(), "public/og");

// Mirror of the routes in scripts/check-og-images.mjs — kept in sync by hand.
const ROUTES = [
  { slug: "home", path: "/", title: "Dose of Proof", category: "HOME" },
  { slug: "mold-toxicity", path: "/mold-toxicity", title: "Mold Toxicity", category: "PILLAR" },
  { slug: "cci", path: "/craniocervical-instability", title: "CCI", category: "PILLAR" },
  { slug: "mcas", path: "/mcas-histamine", title: "MCAS & Histamine", category: "PILLAR" },
  { slug: "start-here", path: "/start-here", title: "Start Here", category: "ORIGIN" },
  { slug: "protocol-vault", path: "/protocol-vault", title: "Protocol Vault", category: "VAULT" },
  { slug: "testing-roadmap", path: "/testing-roadmap", title: "Testing Roadmap", category: "GUIDE" },
  { slug: "blog", path: "/blog", title: "Blog", category: "CONTENT" },
  { slug: "tests-cervical", path: "/tests/cervical-curve-measurement", title: "Cervical Curve Test", category: "DIAGNOSTIC" },
  { slug: "tests-mycotoxin", path: "/tests/mycotoxin-urine-test", title: "Mycotoxin Test", category: "DIAGNOSTIC" },
  { slug: "article-testing", path: "/content/testing-roadmap-what-doctors-miss", title: "Testing Roadmap Article", category: "ARTICLE" },
];

async function renderOne(browser, route) {
  const url = `${BASE}/api/og?title=${encodeURIComponent(route.title)}&category=${encodeURIComponent(route.category)}`;
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
    const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
    const outFile = path.join(OUT, `${route.slug}.png`);
    await fs.writeFile(outFile, buf);
    return { ok: true, slug: route.slug, file: outFile, bytes: buf.length };
  } finally {
    await context.close();
  }
}

async function main() {
  const dry = process.argv.includes("--dry");
  if (dry) {
    console.log(`${ROUTES.length} routes would be rendered to ${OUT}:`);
    for (const r of ROUTES) console.log(`  ${r.slug.padEnd(20)} ${r.path}`);
    return;
  }

  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  let ok = 0;
  let failed = 0;
  for (const r of ROUTES) {
    try {
      const res = await renderOne(browser, r);
      console.log(`  ✓ ${res.slug.padEnd(20)} ${(res.bytes / 1024).toFixed(0)}KB  ${path.relative(process.cwd(), res.file)}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${r.slug}: ${err.message}`);
      failed++;
    }
  }
  await browser.close();
  console.log(`\n${ok} OK, ${failed} failed (${ROUTES.length} total)`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
