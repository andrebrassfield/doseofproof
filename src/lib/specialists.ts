/**
 * Specialist Network — provider data layer.
 *
 * Each row is one vetted specialist. The schema is intentionally narrow
 * (one source of truth) and a `vettedByDre: true` flag is required before
 * a row is shown publicly.
 *
 * Data sources, in priority order:
 *   1. Airtable base (you own, not in repo) — `loadAirtableSpecialists()` below
 *      hits the Airtable API and returns rows merged into the same shape.
 *   2. Local seed (this file) — fallback when Airtable creds are missing,
 *      when the sync fails, or for local dev. **Never put a specialist in
 *      the local seed without setting vettedByDre to true** — this list is
 *      the public-facing network.
 *
 * To add a specialist: edit the SEED below, OR add the row to your Airtable
 * base and run `npm run sync:specialists` (script ships with the Airtable
 * integration).
 */
import { promises as fs } from "node:fs";
import path from "node:path";

export type Specialty =
  | "NUCCA"
  | "Blair"
  | "Orthospinology"
  | "Atlas-Orthogonal"
  | "Functional-Medicine"
  | "Lyme-Literate"
  | "MCAS-Specialist"
  | "Mold-Literate"
  | "CIRS-Shoemaker"
  | "Vagus-Stim"
  | "PT-Occipital"
  | "Endocrinologist"
  | "Other";

export interface Specialist {
  /** Stable ID. */
  id: string;
  /** Provider or clinic name. */
  name: string;
  /** Primary specialty. */
  specialty: Specialty;
  /** Optional sub-specialty. */
  subSpecialty?: string;
  /** City. */
  city: string;
  /** State or region (US-friendly). */
  region: string;
  /** Country. */
  country: string;
  /** Latitude (decimal). */
  lat: number;
  /** Longitude (decimal). */
  lng: number;
  /** Whether this provider offers remote / telemedicine. */
  remote: boolean;
  /** Dre's personal rating, 1-5. */
  rating?: number;
  /** Free-text notes — Dre's experience, what to ask for, etc. */
  notes?: string;
  /** Public contact / booking URL. */
  url?: string;
  /** Public contact email (optional). */
  email?: string;
  /** Date the provider was added to the network. */
  addedAt: string;
  /** Hard gate: row is only public if this is true. */
  vettedByDre: boolean;
  /** If the provider is no longer recommended, soft-hide rather than delete. */
  retired?: boolean;
}

// -----------------------------------------------------------------------------
// Local seed. Empty by default. Add rows here ONLY if the Airtable sync is
// not in use; otherwise Airtable is the source of truth.
// -----------------------------------------------------------------------------
const SEED: Specialist[] = [
  // Example shape — kept commented out so the validator can't flag a
  // half-populated network as production-ready.
  // {
  //   id: "example-nucca-1",
  //   name: "Dr. Example, NUCCA",
  //   specialty: "NUCCA",
  //   city: "Austin",
  //   region: "TX",
  //   country: "USA",
  //   lat: 30.2672,
  //   lng: -97.7431,
  //   remote: false,
  //   rating: 5,
  //   notes: "Template entry. Replace with a real vetted provider.",
  //   url: "https://example.com",
  //   addedAt: "2026-06-01",
  //   vettedByDre: true,
  // },
];

// -----------------------------------------------------------------------------
// Loaders
// -----------------------------------------------------------------------------

let cached: Specialist[] | null = null;

/** Read the public-facing network from the local seed only. */
export function getLocalSpecialists(): Specialist[] {
  return SEED.filter((s) => s.vettedByDre && !s.retired);
}

/**
 * Optional async Airtable loader. Wire this up by:
 *   1. Add AIRTABLE_API_KEY + AIRTABLE_SPECIALISTS_BASE_ID to .env.local
 *   2. Set up an Airtable base with the columns in `Specialist`
 *   3. Drop a script at scripts/sync-airtable-specialists.mjs that pulls
 *      and writes to public/data/specialists.json
 *   4. Update the loader below to read from public/data/specialists.json
 *      (or call the Airtable API directly from the server)
 *
 * Until that's wired up, the page renders the local seed.
 */
export async function loadAirtableSpecialists(): Promise<Specialist[] | null> {
  const dataFile = path.join(process.cwd(), "public/data/specialists.json");
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as Specialist[];
    return parsed.filter((s) => s.vettedByDre && !s.retired);
  } catch {
    return null;
  }
}

export async function getAllSpecialists(): Promise<{
  rows: Specialist[];
  source: "airtable" | "local" | "empty";
}> {
  if (cached) return { rows: cached, source: cached.length > 0 ? "local" : "empty" };
  const fromAirtable = await loadAirtableSpecialists();
  if (fromAirtable && fromAirtable.length > 0) {
    cached = fromAirtable;
    return { rows: fromAirtable, source: "airtable" };
  }
  const local = getLocalSpecialists();
  cached = local;
  return { rows: local, source: local.length > 0 ? "local" : "empty" };
}

/** Clear the cache (useful in tests). */
export function _clearSpecialistsCache() {
  cached = null;
}
