/**
 * Supplement Stack — data layer.
 *
 * Same pattern as specialists.ts: Airtable is the source of truth when
 * available, local SEED is a fallback. Each row represents a single
 * compound at a given dose/brand/cycle in Dre's stack.
 *
 * **The 'disclose' flag is a HARD gate.** Rows with disclose=false are
 * never shown publicly — use this for in-progress experiments that
 * haven't been confirmed as worth recommending.
 *
 * The 'phase' field maps to the body-system layer (Structure /
 * Inflammation / Recovery Output) so the UI can color-code by phase.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

export type SupplementPhase = "Structure" | "Inflammation" | "Recovery Output" | "Drainage" | "Foundational";

export interface Supplement {
  /** Stable ID. */
  id: string;
  /** Compound name (e.g. "Liposomal Glutathione"). */
  compound: string;
  /** Specific dose (e.g. "500 mg", "2 pumps"). */
  dose: string;
  /** Brand Dre uses. */
  brand: string;
  /** When in the daily cycle (morning / midday / evening / bedtime). */
  cycle: "morning" | "midday" | "evening" | "bedtime" | "as-needed";
  /** Whether the compound is cycled (on/off) or taken continuously. */
  continuous: boolean;
  /** Body-system layer for color-coding. */
  phase: SupplementPhase;
  /** Primary purpose. */
  purpose: string;
  /** Biomarker Dre tracks for this compound. */
  biomarker?: string;
  /** Outcome Dre observed. */
  outcome?: string;
  /** Public affiliate link. Use ONLY if disclose=true. */
  affiliateUrl?: string;
  /** Date added to the public stack. */
  addedAt: string;
  /** HARD gate: row is only public if this is true. */
  disclose: boolean;
  /** Soft-hide: if true, row is filtered out (use for retired compounds). */
  retired?: boolean;
}

const SEED: Supplement[] = [];

// -----------------------------------------------------------------------------
// Loaders
// -----------------------------------------------------------------------------
let cached: Supplement[] | null = null;

export function getLocalSupplements(): Supplement[] {
  return SEED.filter((s) => s.disclose && !s.retired);
}

/**
 * Airtable loader stub. Wire up the same way as the specialist network.
 * Reads public/data/supplements.json (which a sync script populates).
 */
export async function loadAirtableSupplements(): Promise<Supplement[] | null> {
  const dataFile = path.join(process.cwd(), "public/data/supplements.json");
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as Supplement[];
    return parsed.filter((s) => s.disclose && !s.retired);
  } catch {
    return null;
  }
}

export async function getAllSupplements(): Promise<{
  rows: Supplement[];
  source: "airtable" | "local" | "empty";
}> {
  if (cached) return { rows: cached, source: cached.length > 0 ? "local" : "empty" };
  const fromAirtable = await loadAirtableSupplements();
  if (fromAirtable && fromAirtable.length > 0) {
    cached = fromAirtable;
    return { rows: fromAirtable, source: "airtable" };
  }
  const local = getLocalSupplements();
  cached = local;
  return { rows: local, source: local.length > 0 ? "local" : "empty" };
}

export function _clearSupplementsCache() {
  cached = null;
}
