import type { Meta, StoryObj } from "@storybook/react";
import { DisclaimerBanner } from "./DisclaimerBanner";

const meta: Meta<typeof DisclaimerBanner> = {
  title: "UI/DisclaimerBanner",
  component: DisclaimerBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sticky bottom medical disclaimer required on all health pages. Dismissible per-session via local state. NOT persisted across reloads — must remain visible on every visit per editorial guidelines.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DisclaimerBanner>;

export const Default: Story = {};
