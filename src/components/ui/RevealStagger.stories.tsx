import type { Meta, StoryObj } from "@storybook/react";
import { RevealStagger, RevealItem } from "./RevealStagger";

const meta: Meta<typeof RevealStagger> = {
  title: "UI/RevealStagger",
  component: RevealStagger,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Wraps children in a `whileInView` Framer Motion container that staggers child reveals. Each direct child should be a `RevealItem` to participate. Honors `useReducedMotion` (opacity-only, no y-translate).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RevealStagger>;

export const Default: Story = {
  render: () => (
    <RevealStagger className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <RevealItem
          key={i}
          className="p-6 border border-white/10 rounded-xl bg-zinc-950 text-center text-white"
        >
          Item {i}
        </RevealItem>
      ))}
    </RevealStagger>
  ),
};
