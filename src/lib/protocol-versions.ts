import fs from "fs";
import path from "path";
import matter from "gray-matter";

const VERSIONS_DIR = path.join(process.cwd(), "src/content/protocol/versions");

export type ProtocolVersionStatus = "active" | "superseded" | "draft";

export interface ProtocolVersionMeta {
  /** Version label, e.g. "v2.1". */
  version: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  status: ProtocolVersionStatus;
  /** One-line headline summary. */
  summary: string;
  /** Bullet list of what changed in this version. */
  whatChanged: string[];
  /** Strategic reasoning for the change (Dre's voice). */
  why: string;
  /** Optional before/after data points. */
  data?: Array<{ label: string; before: string; after: string }>;
  /** Optional evidence URLs (images, OG cards, scan paths). */
  evidence?: string[];
}

export interface ProtocolVersion extends ProtocolVersionMeta {
  slug: string;
  content: string;
}

export function getProtocolVersionSlugs(): string[] {
  if (!fs.existsSync(VERSIONS_DIR)) return [];
  return fs
    .readdirSync(VERSIONS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProtocolVersionBySlug(slug: string): ProtocolVersion | null {
  if (!fs.existsSync(VERSIONS_DIR)) return null;
  const fullPath = path.join(VERSIONS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    version: data.version || "",
    date: data.date || "",
    status: data.status || "draft",
    summary: data.summary || "",
    whatChanged: data.whatChanged || [],
    why: data.why || "",
    data: data.data || [],
    evidence: data.evidence || [],
  };
}

/**
 * Return all protocol versions, sorted reverse-chronologically by date.
 * The active version (status="active") is also exposed separately.
 */
export function getAllProtocolVersions(): ProtocolVersion[] {
  const slugs = getProtocolVersionSlugs();
  const versions = slugs
    .map((s) => getProtocolVersionBySlug(s))
    .filter((v): v is ProtocolVersion => v !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return versions;
}

export function getActiveProtocolVersion(): ProtocolVersion | null {
  return getAllProtocolVersions().find((v) => v.status === "active") ?? null;
}
