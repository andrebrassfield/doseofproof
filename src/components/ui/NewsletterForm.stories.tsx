import type { Meta, StoryObj } from "@storybook/react";
import { NewsletterForm } from "./NewsletterForm";

const meta: Meta<typeof NewsletterForm> = {
  title: "UI/NewsletterForm",
  component: NewsletterForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Email signup form for the newsletter. Currently client-side only (shows 'Subscribed!' on submit). Backend wiring (ConvertKit/Beehiiv) is a 6.2 team deliverable.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

export const Default: Story = {};
