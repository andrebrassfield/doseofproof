import type { Meta, StoryObj } from "@storybook/react";
import { BentoGrid, BentoGridItem } from "./BentoGrid";
import { BrandIcon } from "./BrandIcon";

const meta: Meta<typeof BentoGrid> = {
  title: "UI/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Three-column responsive bento grid for hub pages and feature matrices. Children should be `BentoGridItem` instances. Hover triggers border-accent and translate-x-2 on the content block.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

export const Default: Story = {
  render: () => (
    <BentoGrid>
      <BentoGridItem
        title="Structural Layer"
        description="Cervical curve, C1-C2 alignment, alar ligament integrity"
        icon={<BrandIcon id="spine-neck" className="w-6 h-6 text-accent" />}
        header={
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-white/5" />
        }
      />
      <BentoGridItem
        title="Environmental Layer"
        description="Mycotoxin load, biotoxin pathways, drainage"
        icon={<BrandIcon id="lab-flask" className="w-6 h-6 text-accent" />}
        header={
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-white/5" />
        }
      />
      <BentoGridItem
        title="Autonomic Layer"
        description="Vagal tone, HRV, parasympathetic recovery"
        icon={<BrandIcon id="heart-rate-vagal" className="w-6 h-6 text-accent" />}
        header={
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-white/5" />
        }
      />
    </BentoGrid>
  ),
};
