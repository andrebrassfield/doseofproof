/**
 * Testing Matrix — single source of truth for all labs/tests on Dose of Proof.
 *
 * Each row is one test, joined from:
 *   - the canonical MDX spec in src/content/tests/<slug>.mdx (frontmatter),
 *   - a few manual fields below (cost band, turnaround, myResult) that are
 *     editorial and only belong here, not in the spec itself.
 *
 * When you wire up Notion sync (5.4 follow-up), the loader will fetch a
 * Notion database keyed by `slug` and merge in `myResult` + `myResultNote`
 * from the page properties, so you can update results without editing
 * source code.
 */
import { getAllTests } from "@/lib/mdx";

export type ResultStatus = "confirmed" | "abnormal" | "pending" | "normal" | "n/a";

export interface TestingMatrixRow {
  /** Stable identifier; matches the MDX file slug. */
  slug: string;
  /** Display name (mirrors the MDX frontmatter title). */
  name: string;
  /** Body system pillar (Structure / Mold / MCAS / Autonomic). */
  category: string;
  /** Which stage of the journey this test belongs to. */
  stage: string;
  /** Short why-it-matters blurb (mirrors MDX frontmatter). */
  whyItMatters: string;
  /** BrandIcon id used elsewhere in the app. */
  icon: string;
  /** Cost band (US dollars). Editorial. */
  costBand: "<$100" | "$100-300" | "$300-600" | "$600+";
  /** Turnaround time. Editorial. */
  turnaround: "1-3 days" | "1-2 weeks" | "2-4 weeks" | "4+ weeks";
  /** Dre's own result on this test. null = not run. */
  myResult: ResultStatus | null;
  /** Free-text note accompanying myResult. */
  myResultNote: string | null;
  /** Link to the deep-dive page. */
  href: string;
}

// Editorial supplements that don't live in the MDX spec.
// Add or edit freely — these survive the Notion sync because Notion only
// overrides the last 3 fields (myResult, myResultNote, slug-keyed merge).
const EDITORIAL: Record<
  string,
  Pick<TestingMatrixRow, "costBand" | "turnaround" | "myResult" | "myResultNote">
> = {
  "cervical-curve-measurement": {
    costBand: "$100-300",
    turnaround: "1-2 weeks",
    myResult: "abnormal",
    myResultNote:
      "Reversed cervical curve (-4°). C1-C2 left translation (3.5mm). Confirmed with dynamic upright X-ray and TyTron C-3000.",
  },
  "cirs-mold-panel": {
    costBand: "$300-600",
    turnaround: "2-4 weeks",
    myResult: "abnormal",
    myResultNote:
      "CIRS markers elevated (MMP-9, TGF-β1, C4a). VCS cluster positive. Triggered biotoxin protocol.",
  },
  "mycotoxin-urine-test": {
    costBand: "$300-600",
    turnaround: "2-4 weeks",
    myResult: "abnormal",
    myResultNote:
      "Ochratoxin at 28.4 ppb (reference < 7.5). Cleared with drainage + binder sequencing over 14 months.",
  },
  "mcas-histamine-panel": {
    costBand: "$300-600",
    turnaround: "2-4 weeks",
    myResult: "abnormal",
    myResultNote:
      "Tryptase high-normal. Chromogranin A elevated. DAO low. Responded to mast cell stabilizers + low-histamine diet.",
  },
  "vagal-tone-assessment": {
    costBand: "<$100",
    turnaround: "1-3 days",
    myResult: "confirmed",
    myResultNote:
      "HRV baseline 14ms (subluxated) → 48ms (post-NUCCA). Real-time signal that vagal tone tracks alignment.",
  },
  "ehlers-danlos-hypermobility-screen": {
    costBand: "$100-300",
    turnaround: "1-3 days",
    myResult: "confirmed",
    myResultNote:
      "Beighton score 6/9. Generalized joint laxity; explains alar ligament compromise and persistent C1-C2 instability.",
  },
};

let cached: TestingMatrixRow[] | null = null;

export function getTestingMatrix(): TestingMatrixRow[] {
  if (cached) return cached;
  const tests = getAllTests();
  cached = tests.map((entry) => {
    const slug = entry.slug;
    const editorial = EDITORIAL[slug] ?? {
      costBand: "$100-300" as const,
      turnaround: "1-2 weeks" as const,
      myResult: null as ResultStatus | null,
      myResultNote: null as string | null,
    };
    return {
      slug,
      name: entry.meta.title,
      category: entry.meta.category,
      stage: entry.meta.stage,
      whyItMatters: entry.meta.whyItMatters,
      icon: entry.meta.icon,
      costBand: editorial.costBand,
      turnaround: editorial.turnaround,
      myResult: editorial.myResult,
      myResultNote: editorial.myResultNote,
      href: `/tests/${slug}`,
    };
  });
  return cached;
}

export function getTestingMatrixRow(slug: string): TestingMatrixRow | null {
  return getTestingMatrix().find((r) => r.slug === slug) ?? null;
}
