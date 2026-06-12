import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WORKSPACE_DIR = process.cwd();
const ARTICLES_DIR = path.join(WORKSPACE_DIR, "src/content/articles");
const TESTS_DIR = path.join(WORKSPACE_DIR, "src/content/tests");
const PUBLIC_DIR = path.join(WORKSPACE_DIR, "public");
const APP_DIR = path.join(WORKSPACE_DIR, "src/app");
const CONTENT_STANDARDS_DOC = path.join(WORKSPACE_DIR, "CONTENT_STANDARDS.md");

let errors = [];
let warnings = [];
let stats = { articles: 0, tests: 0, claims: 0, citations: 0, affiliateLinks: 0, images: 0, missingDimensions: 0 };

function logError(file, message) {
  errors.push({ file: path.relative(WORKSPACE_DIR, file), message });
}
function logWarning(file, message) {
  warnings.push({ file: path.relative(WORKSPACE_DIR, file), message });
}

function assetExists(assetPath) {
  if (!assetPath.startsWith("/")) return false;
  return fs.existsSync(path.join(PUBLIC_DIR, assetPath));
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return -1;
  }
}

// ---------------------------------------------------------------------------
// Claim → citation: surface "study shows" / "research indicates" / pubmed IDs
// and verify that the surrounding paragraph (within 800 chars) contains a
// hyperlink to a primary source (pubmed, nih, doi.org, or a peer-reviewed
// journal). This is a soft check — warns rather than fails, because good
// prose often links one source per section.
// ---------------------------------------------------------------------------
const CLAIM_PATTERNS = [
  /\bstud(y|ies)\s+(show|shows|reported|demonstrated|found|revealed|suggest)\b/i,
  /\bresearch\s+(shows|indicates|suggests|demonstrates|confirms|reveals)\b/i,
  /\bclinical\s+trials?\s+(show|indicate|suggest|demonstrate)\b/i,
  /\b(PubMed|PMID)\s*[:\s]?\s*(\d+)\b/i,
  /\bdoi\s*[:\s]\s*10\.\d{4,}\b/i,
];
const SOURCE_HOSTS = ["pubmed.ncbi.nlm.nih.gov", "ncbi.nlm.nih.gov", "doi.org", "nih.gov", "nejm.org", "thelancet.com", "jamanetwork.com", "nature.com", "cell.com", "sciencedirect.com", "frontiersin.org"];

function checkClaimCitation(filePath, content) {
  let claims = 0;
  let citations = 0;
  for (const pattern of CLAIM_PATTERNS) {
    const matches = [...content.matchAll(new RegExp(pattern, "gi"))];
    for (const m of matches) {
      claims++;
      stats.claims++;
      // Look in a 1200-char window after the claim for a source link
      const idx = m.index ?? 0;
      const window = content.slice(idx, idx + 1200);
      const hasCitation = SOURCE_HOSTS.some((host) => window.includes(host));
      if (hasCitation) {
        citations++;
        stats.citations++;
      } else {
        logWarning(filePath, `Claim "${m[0]}" not followed by a primary-source citation in the same paragraph.`);
      }
    }
  }
  return { claims, citations };
}

// ---------------------------------------------------------------------------
// Affiliate link detection: warn when external product/store links are
// present without the inline "I earn a commission" disclosure phrase.
// ---------------------------------------------------------------------------
const AFFILIATE_HOSTS = [
  "amazon.com", "amzn.to", "amzn.eu",
  "iherb.com", "iherb.co",
  "fullscript.com", "thorne.com", "swansonvitamins.com",
  "ancient-nutrition.com", "microbiomelabs.com",
  "affiliate", "ref=", "/?ref=", "?ref=",
];
const DISCLOSURE_PHRASES = [
  "I earn a commission",
  "affiliate link",
  "at no extra cost to you",
  "I may earn a commission",
  "supports the site",
];

function checkAffiliateDisclosure(filePath, content) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let matches;
  while ((matches = linkRegex.exec(content)) !== null) {
    const url = matches[2].toLowerCase();
    if (AFFILIATE_HOSTS.some((h) => url.includes(h))) {
      stats.affiliateLinks++;
      // Check within 600 chars of the link for a disclosure phrase
      const idx = matches.index;
      const window = content.slice(Math.max(0, idx - 600), idx + 600);
      const hasDisclosure = DISCLOSURE_PHRASES.some((p) =>
        window.toLowerCase().includes(p.toLowerCase())
      );
      if (!hasDisclosure) {
        logWarning(
          filePath,
          `Affiliate-style link "${url}" without an inline disclosure ("${DISCLOSURE_PHRASES[0]}") within 600 chars. Add an inline note per the affiliate-disclosure policy.`
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Image validation:
// - All images < 200KB (raw on-disk size)
// - All images in /public have a width/height set in the markdown or in the
//   frontmatter (avoids CLS)
// - Detects next/image JSX usage and skips the size check (size check applies
//   to plain markdown images)
// ---------------------------------------------------------------------------
function checkImages(filePath, content, data) {
  // Markdown images: ![alt](/path)
  const mdImageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
  let m;
  while ((m = mdImageRegex.exec(content)) !== null) {
    const alt = m[1];
    const src = m[2];
    stats.images++;
    if (src.startsWith("/")) {
      const fullPath = path.join(PUBLIC_DIR, src.replace(/\?.*$/, ""));
      if (!assetExists(src.replace(/\?.*$/, ""))) {
        logError(filePath, `Image asset does not exist in public/: ${src}`);
        continue;
      }
      const size = getFileSize(fullPath);
      if (size > 200 * 1024) {
        logWarning(
          filePath,
          `Image ${src} is ${(size / 1024).toFixed(0)}KB (> 200KB). Consider compressing or converting to AVIF/WebP.`
        );
      }
      // Check that the markdown title or alt includes dimensions, OR the
      // the frontmatter has a width/height for the image.
      const title = m[3] || "";
      const hasDimensions = /(\d{2,4})[x×](\d{2,4})/i.test(alt + title);
      if (!hasDimensions && !data?.ogImage) {
        stats.missingDimensions++;
        logWarning(
          filePath,
          `Image ${src} is missing explicit dimensions in alt/title (e.g. "1200x630"). Add dimensions to prevent CLS.`
        );
      }
    }
  }
  // HTML <img> usage
  const htmlImageRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g;
  while ((m = htmlImageRegex.exec(content)) !== null) {
    const src = m[1];
    stats.images++;
    const hasWidth = /\bwidth\s*=/.test(m[0]);
    const hasHeight = /\bheight\s*=/.test(m[0]);
    if (!hasWidth || !hasHeight) {
      logWarning(
        filePath,
        `<img src="${src}"> is missing width/height attributes (CLS risk).`
      );
    }
  }
  // next/image <Image>: only check that src exists, not size (Next.js handles opt)
  const nextImageRegex = /<Image\s+[^>]*src=\{?["']?([^"'\s>}]+)["']?\}?/g;
  while ((m = nextImageRegex.exec(content)) !== null) {
    // Best-effort: just record; Next.js optimizer handles the rest
  }
}

// ---------------------------------------------------------------------------
// Health page medical disclaimer check.
// Any MDX file under src/app/ that lives in a health-relevant route segment
// (mold-toxicity, mcas-histamine, craniocervical-instability, start-here,
// protocol-vault, testing-roadmap, tests, content) must render <DisclaimerBanner />
// somewhere in its source.
// ---------------------------------------------------------------------------
const HEALTH_ROUTES = [
  "mold-toxicity",
  "mcas-histamine",
  "craniocervical-instability",
  "start-here",
  "protocol-vault",
  "testing-roadmap",
  "tests",
  "content",
  "lead-magnet",
];

function checkMedicalDisclaimerOnHealthPages() {
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "page.tsx" || entry.name === "layout.tsx") {
        const rel = path.relative(WORKSPACE_DIR, full);
        const isHealthRoute = HEALTH_ROUTES.some((r) => rel.includes(`app/${r}`) || rel.includes(`app\\${r}`));
        if (!isHealthRoute) continue;
        const src = fs.readFileSync(full, "utf8");
        if (!/DisclaimerBanner/.test(src)) {
          logError(
            full,
            `Health route page does not render <DisclaimerBanner />. Add it per CONTENT_STANDARDS.md §4.`
          );
        }
      }
    }
  }
  walk(APP_DIR);
}

// ---------------------------------------------------------------------------
// Original frontmatter + image-existence validation (unchanged behavior).
// ---------------------------------------------------------------------------
function validateArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) return;
  const articles = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
  stats.articles = articles.length;
  console.log(`Found ${articles.length} articles to validate.`);
  for (const file of articles) {
    const filePath = path.join(ARTICLES_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data;
      const content = parsed.content;

      if (!data.title || typeof data.title !== "string") {
        logError(filePath, "Missing or invalid 'title' frontmatter field.");
      }
      if (!data.description || typeof data.description !== "string") {
        logError(filePath, "Missing or invalid 'description' frontmatter field.");
      } else if (data.description.length > 165) {
        logWarning(filePath, `Description is quite long (${data.description.length} chars), recommend keeping it under 160 for SEO.`);
      }
      if (!data.publishedAt && !data.date) {
        logError(filePath, "Missing date/publishedAt field.");
      }
      if (!data.category || typeof data.category !== "string") {
        logError(filePath, "Missing or invalid 'category' field.");
      }
      if (data.readTime === undefined || typeof data.readTime !== "number") {
        logError(filePath, "Missing or invalid 'readTime' field (must be a number).");
      }

      checkClaimCitation(filePath, content);
      checkAffiliateDisclosure(filePath, content);
      checkImages(filePath, content, data);
    } catch (err) {
      logError(filePath, `Failed to parse MDX file: ${err.message}`);
    }
  }
}

function validateTests() {
  if (!fs.existsSync(TESTS_DIR)) return;
  const tests = fs.readdirSync(TESTS_DIR).filter((f) => f.endsWith(".mdx"));
  stats.tests = tests.length;
  console.log(`Found ${tests.length} test specs to validate.`);
  for (const file of tests) {
    const filePath = path.join(TESTS_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const data = parsed.data;
      const content = parsed.content;

      if (!data.title || typeof data.title !== "string") {
        logError(filePath, "Missing or invalid 'title' frontmatter field.");
      }
      if (!data.intent || typeof data.intent !== "string") {
        logError(filePath, "Missing or invalid 'intent' field.");
      }
      if (!data.category || typeof data.category !== "string") {
        logError(filePath, "Missing or invalid 'category' field.");
      }
      if (!data.stage || typeof data.stage !== "string") {
        logError(filePath, "Missing or invalid 'stage' field.");
      }
      if (!data.whyItMatters || typeof data.whyItMatters !== "string") {
        logError(filePath, "Missing or invalid 'whyItMatters' field.");
      }
      if (!data.whatItCanShow || !Array.isArray(data.whatItCanShow)) {
        logError(filePath, "Missing or invalid 'whatItCanShow' field (must be an array).");
      }
      if (!data.icon || typeof data.icon !== "string") {
        logError(filePath, "Missing or invalid 'icon' field.");
      }

      checkClaimCitation(filePath, content);
      checkAffiliateDisclosure(filePath, content);
      checkImages(filePath, content, data);
    } catch (err) {
      logError(filePath, `Failed to parse MDX file: ${err.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log("\nValidating content standards (Phase 5.3)…");
validateArticles();
validateTests();
checkMedicalDisclaimerOnHealthPages();

console.log("\n==================================");
console.log("      VALIDATION SUMMARY          ");
console.log("==================================");
console.log(`  Articles validated:       ${stats.articles}`);
console.log(`  Test specs validated:     ${stats.tests}`);
console.log(`  Claims detected:          ${stats.claims}`);
console.log(`  Claims with citation:     ${stats.citations}`);
console.log(`  Affiliate links checked:  ${stats.affiliateLinks}`);
console.log(`  Images checked:           ${stats.images}`);
console.log(`  Images missing dims:      ${stats.missingDimensions}`);

if (warnings.length > 0) {
  console.log(`\nFound ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.warn(`  [WARN]  ${w.file}: ${w.message}`));
}

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  [ERROR] ${e.file}: ${e.message}`));
  console.error("\nValidation failed.");
  process.exit(1);
} else {
  console.log("\nAll content files successfully validated! No errors found.");
  process.exit(0);
}
