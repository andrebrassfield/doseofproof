import type { Meta, StoryObj } from "@storybook/react";
import { ProtocolChangelog } from "./ProtocolChangelog";
import type { ProtocolVersion } from "@/lib/protocol-versions";

const SAMPLE: ProtocolVersion[] = [
  {
    slug: "v2.1",
    version: "v2.1",
    date: "2026-05-15",
    status: "active",
    summary: "Drainage-first sequencing + low-histamine diet; HRV baseline stabilizes at 48ms.",
    whatChanged: [
      "Reordered supplement stack: drainage (liposomal glutathione + binders) now precedes inflammatory modulators by 4 weeks.",
      "Added DAO enzyme at every meal.",
      "NUCCA adjustments moved to 3-week cadence (down from weekly) once alignment held.",
    ],
    why: "Drainage before binders prevents the die-off reactions that masquerade as Herxheimer flare-ups.",
    data: [
      { label: "HRV baseline", before: "14 ms", after: "48 ms" },
      { label: "Sleep Quality Index", before: "62%", after: "89%" },
    ],
    evidence: ["/marketing-assets/scans/tytron-scan.png"],
    content: "",
  },
  {
    slug: "v2.0",
    version: "v2.0",
    date: "2026-02-01",
    status: "superseded",
    summary: "Added the cervical curve + C1-C2 imaging as a primary diagnostic, not a downstream check.",
    whatChanged: [
      "Upright dynamic X-ray (flexion + extension) added to intake.",
      "TyTron C-3000 paraspinal thermography added as a low-cost pre-screen.",
      "Sequenced structural imaging BEFORE environmental testing for patients with mechanical symptoms.",
    ],
    why: "The downstream inflammatory cascade resolved once the mechanical driver was identified and treated.",
    data: [
      { label: "Imaging cost", before: "$0 (skipped)", after: "$420" },
      { label: "Time to first structural answer", before: "n/a", after: "2 weeks" },
    ],
    evidence: ["/marketing-assets/scans/ap-xray.jpg"],
    content: "",
  },
  {
    slug: "v1.1",
    version: "v1.1",
    date: "2025-08-10",
    status: "superseded",
    summary: "Replaced pulse-dose antifungals with continuous low-dose binders; added mast cell stabilizers.",
    whatChanged: [
      "Removed prescription antifungal rotation; replaced with OTC binder sequencing.",
      "Added quercetin + vitamin C as daily mast cell stabilizers.",
      "Lowered the glutathione dose; high-dose was producing paradoxical oxidative stress.",
    ],
    why: "Lower, sustained intervention produced better outcomes with fewer side effects than pulse therapy.",
    data: [
      { label: "Ochratoxin (urine)", before: "28.4 ppb", after: "11.2 ppb" },
    ],
    evidence: [],
    content: "",
  },
];

const meta: Meta<typeof ProtocolChangelog> = {
  title: "Authority/ProtocolChangelog",
  component: ProtocolChangelog,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reverse-chronological timeline of the Dose of Proof protocol versions. Each version: what changed, why, before/after data, evidence links. Active version gets a timeline highlight; superseded versions stay visible (full transparency). Embeddable in blog posts and lead-magnet pages via the `fullPage` prop.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProtocolChangelog>;

export const FullPage: Story = { args: { versions: SAMPLE, fullPage: true } };
export const Compact: Story = { args: { versions: SAMPLE, fullPage: false } };
