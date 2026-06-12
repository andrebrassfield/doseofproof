import type { Meta, StoryObj } from "@storybook/react";
import { BrandIcon } from "./BrandIcon";

const meta: Meta<typeof BrandIcon> = {
  title: "UI/BrandIcon",
  component: BrandIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SVG sprite wrapper that references the brand icon set at `/svgs/icons/proof-icons.svg`. The `id` prop maps to a sprite cell, with optional aliases for common names. All icons are 24x24 and inherit `currentColor`.",
      },
    },
  },
  argTypes: {
    id: {
      control: "select",
      options: [
        "checkmark-shield",
        "scan-line",
        "chart-up",
        "warning-triangle",
        "spine-neck",
        "brain-circuit",
        "inflammation-flame",
        "gut-intestine",
        "mast-cell",
        "heart-rate-vagal",
        "pill-capsule",
        "microscope",
        "test-tube",
        "dna-helix",
        "lab-flask",
        "gear-settings",
        "clock-time",
        "calendar-day",
        "folder-structure",
        "target-crosshair",
        "bookmark-save",
        "share-arrow",
        "comment-bubble",
        "fire-hot",
        "trending-up",
      ],
    },
    className: { control: "text" },
  },
  args: { id: "target-crosshair", className: "w-12 h-12 text-accent" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BrandIcon>;

export const Default: Story = {};

// Visual grid of every supported icon so designers/devs can pick visually.
export const IconLibrary: Story = {
  parameters: { layout: "fullscreen" },
  render: () => {
    const ids = [
      "checkmark-shield",
      "scan-line",
      "chart-up",
      "warning-triangle",
      "spine-neck",
      "brain-circuit",
      "inflammation-flame",
      "gut-intestine",
      "mast-cell",
      "heart-rate-vagal",
      "pill-capsule",
      "microscope",
      "test-tube",
      "dna-helix",
      "lab-flask",
      "gear-settings",
      "clock-time",
      "calendar-day",
      "folder-structure",
      "target-crosshair",
      "bookmark-save",
      "share-arrow",
      "comment-bubble",
      "fire-hot",
      "trending-up",
    ];
    return (
      <div className="grid grid-cols-5 gap-4 max-w-3xl">
        {ids.map((id) => (
          <div
            key={id}
            className="flex flex-col items-center gap-2 p-4 border border-white/10 rounded-lg bg-zinc-950"
          >
            <BrandIcon id={id} className="w-8 h-8 text-accent" />
            <span className="text-[10px] font-mono text-white/50 text-center break-all">
              {id}
            </span>
          </div>
        ))}
      </div>
    );
  },
  name: "Icon Library (all 25)",
};
