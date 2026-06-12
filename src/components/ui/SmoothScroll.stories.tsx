import type { Meta, StoryObj } from "@storybook/react";
import { SmoothScroll } from "./SmoothScroll";

const meta: Meta<typeof SmoothScroll> = {
  title: "UI/SmoothScroll",
  component: SmoothScroll,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Initializes Lenis smooth-scroll and connects it to GSAP ScrollTrigger. Mount once in the root layout (already wired in `src/app/layout.tsx`). No visual output — purely a side-effect component.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SmoothScroll>;

// Renders an explicit empty story block so the autodocs page has a frame of reference.
export const Default: Story = {
  render: () => (
    <>
      <SmoothScroll />
      <div className="p-12 text-white/50 text-sm">
        SmoothScroll is mounted. Scroll the iframe to feel Lenis's interpolation (or check the
        console for the GSAP/Lenis RAF link).
      </div>
    </>
  ),
};
