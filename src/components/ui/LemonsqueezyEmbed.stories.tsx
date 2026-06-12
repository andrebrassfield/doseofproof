import type { Meta, StoryObj } from "@storybook/react";
import { LemonsqueezyEmbed } from "./LemonsqueezyEmbed";

const meta: Meta<typeof LemonsqueezyEmbed> = {
  title: "UI/LemonsqueezyEmbed",
  component: LemonsqueezyEmbed,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lemon Squeezy checkout trigger. Loads the LS script on mount and refreshes the LS instance to ensure the click handler is bound to the rendered anchor.",
      },
    },
  },
  argTypes: {
    url: { control: "text" },
    label: { control: "text" },
  },
  args: {
    url: "https://doseofproof.lemonsqueezy.com/buy/example",
    label: "Buy Recovery Guide — $47",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LemonsqueezyEmbed>;

export const Default: Story = {};
