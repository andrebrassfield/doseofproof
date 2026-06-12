import type { Meta, StoryObj } from "@storybook/react";
import { TestingMatrix } from "./TestingMatrix";
import type { TestingMatrixRow } from "@/lib/testing-matrix";

const SAMPLE: TestingMatrixRow[] = [
  {
    slug: "cervical-curve-measurement",
    name: "Cervical Curve and C1-C2 Imaging",
    category: "Structure",
    stage: "Mechanical root",
    whyItMatters: "Imaging the structure that may be irritating the brainstem.",
    icon: "spine-neck",
    costBand: "$100-300",
    turnaround: "1-2 weeks",
    myResult: "abnormal",
    myResultNote:
      "Reversed cervical curve (-4°). C1-C2 left translation (3.5mm). Confirmed with dynamic upright X-ray and TyTron C-3000.",
    href: "/tests/cervical-curve-measurement",
  },
  {
    slug: "cirs-mold-panel",
    name: "CIRS Mold Panel",
    category: "Mold",
    stage: "Environmental root",
    whyItMatters: "Detects the inflammatory cascade that standard blood work misses.",
    icon: "lab-flask",
    costBand: "$300-600",
    turnaround: "2-4 weeks",
    myResult: "abnormal",
    myResultNote: "MMP-9, TGF-β1, C4a all elevated. VCS cluster positive.",
    href: "/tests/cirs-mold-panel",
  },
  {
    slug: "vagal-tone-assessment",
    name: "Vagal Tone Assessment (HRV)",
    category: "Autonomic",
    stage: "Downstream",
    whyItMatters: "Real-time signal of parasympathetic function.",
    icon: "heart-rate-vagal",
    costBand: "<$100",
    turnaround: "1-3 days",
    myResult: "confirmed",
    myResultNote: "HRV baseline 14ms (subluxated) → 48ms (post-NUCCA).",
    href: "/tests/vagal-tone-assessment",
  },
  {
    slug: "mcas-histamine-panel",
    name: "MCAS / Histamine Panel",
    category: "MCAS",
    stage: "Downstream",
    whyItMatters: "Validates mast cell reactivity as a downstream amplifier.",
    icon: "mast-cell",
    costBand: "$300-600",
    turnaround: "2-4 weeks",
    myResult: "abnormal",
    myResultNote: "Tryptase high-normal. Chromogranin A elevated. DAO low.",
    href: "/tests/mcas-histamine-panel",
  },
  {
    slug: "mycotoxin-urine-test",
    name: "Mycotoxin Urine Test",
    category: "Mold",
    stage: "Environmental root",
    whyItMatters: "Quantifies stored biotoxin load before binder sequencing.",
    icon: "test-tube",
    costBand: "$300-600",
    turnaround: "2-4 weeks",
    myResult: "abnormal",
    myResultNote: "Ochratoxin 28.4 ppb (ref < 7.5). Cleared with drainage + binders over 14 months.",
    href: "/tests/mycotoxin-urine-test",
  },
  {
    slug: "ehlers-danlos-hypermobility-screen",
    name: "Hypermobility (EDS) Screen",
    category: "Structure",
    stage: "Predisposing",
    whyItMatters: "Explains alar ligament compromise and persistent C1-C2 instability.",
    icon: "dna-helix",
    costBand: "$100-300",
    turnaround: "1-3 days",
    myResult: "confirmed",
    myResultNote: "Beighton 6/9. Generalized joint laxity.",
    href: "/tests/ehlers-danlos-hypermobility-screen",
  },
];

const meta: Meta<typeof TestingMatrix> = {
  title: "Authority/TestingMatrix",
  component: TestingMatrix,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Filterable + sortable TanStack Table that consolidates every test in the Dose of Proof library. Pillars (Structure/Mold/MCAS/Autonomic), cost band, turnaround, Dre's own result, and a free-text notes column. Underlying data lives in `src/lib/testing-matrix.ts`; columns are typed against `TestingMatrixRow` so the Notion sync stub can drop in cleanly later.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TestingMatrix>;

export const Default: Story = { args: { rows: SAMPLE } };

export const FilteredToStructure: Story = {
  args: { rows: SAMPLE },
  // Stories can be played to simulate a filter click — see the canonical stories
  // for a fully-interactive play example.
};
