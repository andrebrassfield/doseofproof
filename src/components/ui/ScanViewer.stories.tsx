import type { Meta, StoryObj } from "@storybook/react";
import { ScanViewer } from "./ScanViewer";

const meta: Meta<typeof ScanViewer> = {
  title: "Interactive/ScanViewer",
  component: ScanViewer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Diagnostic scan viewer with clickable hotspot annotations. Each hotspot toggles a clinical detail panel. Built as a client island (progressive enhancement friendly). **Note:** the v1.0 design uses CSS-positioned `+` markers without zoom/pan. The 'next level' upgrade is to add `react-zoom-pan-pinch` (5.2 audit follow-up).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScanViewer>;

const sampleHotspots = [
  {
    id: "c1-c2",
    top: "18%",
    left: "52%",
    title: "C1–C2 Translational Instability",
    description:
      "Lateral mass asymmetry consistent with alar ligament compromise. Upright imaging is required to expose the instability that supine MRI masks.",
  },
  {
    id: "curve",
    top: "45%",
    left: "30%",
    title: "Reversed Cervical Curve",
    description:
      "Lordotic curve measured at -4° (kyphotic). Alters vagal nerve tone and increases mechanical load on the brainstem.",
  },
  {
    id: "vagus",
    top: "62%",
    left: "70%",
    title: "Vagus Nerve Pathway",
    description:
      "Course of CN X through the jugular foramen. Adjacent soft-tissue inflammation is a common downstream driver of autonomic dysregulation.",
  },
  {
    id: "temporal",
    top: "28%",
    left: "20%",
    title: "Temporal Mandibular Joint",
    description:
      "TMJ asymmetry places traction on the trigeminal system. Often correlates with the vagal symptoms patients describe as 'head pressure'.",
  },
];

export const Default: Story = {
  args: {
    imageSrc: "/images/scans/sample-tytron.jpg",
    altText: "Cervical spine upright X-ray with annotated clinical findings",
    hotspots: sampleHotspots,
  },
  decorators: [
    (Story) => (
      <div className="p-8 max-w-6xl mx-auto">
        <Story />
      </div>
    ),
  ],
};

export const WithFirstHotspotActive: Story = {
  args: { ...Default.args, hotspots: sampleHotspots },
  play: async ({ canvas }) => {
    const btn = await canvas.findByRole("button", { name: /view detail: c1–c2/i });
    btn.click();
  },
};
