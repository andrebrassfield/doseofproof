import type { Meta, StoryObj } from "@storybook/react";
import { SafeImage } from "./SafeImage";

const meta: Meta<typeof SafeImage> = {
  title: "UI/SafeImage",
  component: SafeImage,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Wrapper around `next/image` that adds a skeleton pulse while loading and a fallback color. Inherits all `next/image` props. Use this instead of importing `next/image` directly anywhere in the app.",
      },
    },
  },
  args: {
    src: "/svgs/icons/proof-icons.svg",
    alt: "Decorative placeholder",
    width: 240,
    height: 240,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SafeImage>;

export const FixedSize: Story = {};

export const Fill: Story = {
  args: { fill: true, alt: "Fill-mode placeholder" },
  render: (args) => (
    <div className="relative w-full h-64 border border-white/10 rounded-xl">
      <SafeImage {...args} />
    </div>
  ),
};
