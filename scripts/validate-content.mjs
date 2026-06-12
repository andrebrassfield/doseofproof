import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WORKSPACE_DIR = process.cwd();
const ARTICLES_DIR = path.join(WORKSPACE_DIR, "src/content/articles");
const TESTS_DIR = path.join(WORKSPACE_DIR, "src/content/tests");
const PUBLIC_DIR = path.join(WORKSPACE_DIR, "public");

let errors = [];
let warnings = [];

function logError(file, message) {
  errors.push({ file: path.relative(WORKSPACE_DIR, file), message });
}

function logWarning(file, message) {
  warnings.push({ file: path.relative(WORKSPACE_DIR, file), message });
}

// Helper to check if file exists
function assetExists(assetPath) {
  if (!assetPath.startsWith("/")) return false;
  const fullPath = path.join(PUBLIC_DIR, assetPath);
  return fs.existsSync(fullPath);
}

// 1. Validate Articles
if (fs.existsSync(ARTICLES_DIR)) {
  const articles = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith(".mdx"));
  console.log(`Found ${articles.length} articles to validate.`);

  articles.forEach(file => {
    const filePath = path.join(ARTICLES_DIR, file);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = matter(content);
      const data = parsed.data;

      // Validate required fields
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

      // Check referenced images in MDX content body
      const imageRegex = /!\[.*?\]\((.*?)\)/g;
      let match;
      while ((match = imageRegex.exec(parsed.content)) !== null) {
        const imgPath = match[1];
        if (imgPath.startsWith("/") && !assetExists(imgPath)) {
          logError(filePath, `Referenced image asset does not exist in public directory: ${imgPath}`);
        }
      }
    } catch (err) {
      logError(filePath, `Failed to parse MDX file: ${err.message}`);
    }
  });
} else {
  console.log("Articles directory not found. Skipping articles validation.");
}

// 2. Validate Tests
if (fs.existsSync(TESTS_DIR)) {
  const tests = fs.readdirSync(TESTS_DIR).filter(f => f.endsWith(".mdx"));
  console.log(`Found ${tests.length} test specs to validate.`);

  tests.forEach(file => {
    const filePath = path.join(TESTS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = matter(content);
      const data = parsed.data;

      // Validate required fields
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

      // Check test image reference
      if (data.image) {
        if (data.image.startsWith("/") && !assetExists(data.image)) {
          logError(filePath, `Referenced frontmatter image does not exist in public directory: ${data.image}`);
        }
      }

      // Check referenced images in MDX content body
      const imageRegex = /!\[.*?\]\((.*?)\)/g;
      let match;
      while ((match = imageRegex.exec(parsed.content)) !== null) {
        const imgPath = match[1];
        if (imgPath.startsWith("/") && !assetExists(imgPath)) {
          logError(filePath, `Referenced image asset does not exist in public directory: ${imgPath}`);
        }
      }
    } catch (err) {
      logError(filePath, `Failed to parse MDX file: ${err.message}`);
    }
  });
} else {
  console.log("Tests directory not found. Skipping tests validation.");
}

// Report
console.log("\n==================================");
console.log("      VALIDATION SUMMARY          ");
console.log("==================================");

if (warnings.length > 0) {
  console.log(`\nFound ${warnings.length} warning(s):`);
  warnings.forEach(w => console.warn(`[WARNING] ${w.file}: ${w.message}`));
}

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} error(s):`);
  errors.forEach(e => console.error(`[ERROR] ${e.file}: ${e.message}`));
  console.error("\nValidation failed.");
  process.exit(1);
} else {
  console.log("\nAll content files successfully validated! No errors found.");
  process.exit(0);
}
