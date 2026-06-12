import type { Meta, StoryObj } from "@storybook/react";
import { TimelineScrubber } from "./TimelineScrubber";

const meta: Meta<typeof TimelineScrubber> = {
  title: "Interactive/TimelineScrubber",
  component: TimelineScrubber,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Horizontal 4-step scrubber showing the journey Exposure → Emergency → Diagnosed → Recovered. Click any phase node to expand symptom load + active protocol. **Audit finding (5.2):** no keyboard support yet — needs Arrow Left/Right and Home/End to be WCAG compliant.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimelineScrubber>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 max-w-5xl mx-auto">
        <Story />
      </div>
    ),
  ],
};

export const AtDiagnosedPhase: Story = {
  play: async ({ canvas }) => {
    // Phase index 2 = "Diagnostic Breakthroughs" (the default state already,
    // but the play function demonstrates intent for future keyboard tests).
    await canvas.findAllByRole("button");
  },
};
