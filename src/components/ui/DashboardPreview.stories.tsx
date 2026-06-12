import type { Meta, StoryObj } from "@storybook/react";
import { DashboardPreview } from "./DashboardPreview";

const meta: Meta<typeof DashboardPreview> = {
  title: "Interactive/DashboardPreview",
  component: DashboardPreview,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Toggleable autonomic-status dashboard that contrasts 'Aligned Post-NUCCA' vs 'Rotated state' across HRV, sleep, cervical alignment, and histamine mediation. Currently a static demo with hard-coded values; future iteration (5.4) will swap to a real Notion embed or live anonymized JSON via the 'Show my data' toggle.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DashboardPreview>;

export const Aligned: Story = {
  decorators: [(Story) => <div className="p-8 max-w-4xl mx-auto"><Story /></div>],
};

export const Rotated: Story = {
  play: async ({ canvas, userEvent }) => {
    const btn = await canvas.findByRole("button", { name: /rotated state/i });
    await userEvent.click(btn);
  },
};
