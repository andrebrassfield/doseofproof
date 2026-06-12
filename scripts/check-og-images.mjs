#!/usr/bin/env node
/**
 * Phase 5.3 OG endpoint health check.
 *
 * For a representative sample of routes, hits the dynamic /api/og endpoint
 * with a route-specific title and verifies the response is a 200 with a
 * non-trivial image/png body. Catches:
 *   - Typos in the route registry
 *   - next/og runtime crashes
 *   - Missing env vars
 *
 * Exits 0 on success, 1 on any failure.
 */
import process from "node:process";

const BASE = process.env.OG_CHECK_BASE_URL ?? "http://localhost:3000";
const ROUTES = [
  { path: "/", title: "Dose of Proof", category: "HOME" },
  { path: "/mold-toxicity", title: "Mold Toxicity", category: "PILLAR" },
  { path: "/craniocervical-instability", title: "CCI", category: "PILLAR" },
  { path: "/mcas-histamine", title: "MCAS & Histamine", category: "PILLAR" },
  { path: "/start-here", title: "Start Here", category: "ORIGIN" },
  { path: "/protocol-vault", title: "Protocol Vault", category: "VAULT" },
  { path: "/testing-roadmap", title: "Testing Roadmap", category: "GUIDE" },
  { path: "/blog", title: "Blog", category: "CONTENT" },
  { path: "/tests/cervical-curve-measurement", title: "Cervical Curve Test", category: "DIAGNOSTIC" },
  { path: "/tests/mycotoxin-urine-test", title: "Mycotoxin Test", category: "DIAGNOSTIC" },
  { path: "/content/testing-roadmap-what-doctors-miss", title: "Testing Roadmap Article", category: "ARTICLE" },
];

async function check(route) {
  const url = `${BASE}/api/og?title=${encodeURIComponent(route.title)}&category=${encodeURIComponent(route.category)}`;
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(`${route.path}: HTTP ${res.status}`);
  }
  const buf = await res.arrayBuffer();
  if (buf.byteLength < 1024) {
    throw new Error(`${route.path}: response too small (${buf.byteLength} bytes)`);
  }
  // PNG magic number: 89 50 4E 47
  const view = new Uint8Array(buf);
  if (view[0] !== 0x89 || view[1] !== 0x50 || view[2] !== 0x4e || view[3] !== 0x47) {
    throw new Error(`${route.path}: response is not a PNG`);
  }
  return `${route.path} → ${(buf.byteLength / 1024).toFixed(1)}KB`;
}

let failed = 0;
let ok = 0;
for (const route of ROUTES) {
  try {
    const msg = await check(route);
    console.log(`  ✓ ${msg}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ ${err.message}`);
    failed++;
  }
}

console.log(`\n${ok} OK, ${failed} failed (${ROUTES.length} total)`);
if (failed > 0) process.exit(1);
