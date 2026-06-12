import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primary CTA button with magnetic spring physics on hover. Honors `prefers-reduced-motion`. Polymorphic: renders as `<a>` when `href` is provided, otherwise `<button>`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Visual variant. Primary is the accent-color action; secondary is glass; ghost is text-only.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    children: {
      control: "text",
      description: "Label content.",
    },
    disabled: { control: "boolean" },
    href: { control: "text" },
  },
  args: {
    children: "View Test Guide",
    variant: "primary",
    size: "default",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const AsLink: Story = {
  args: { href: "/tests/cervical-curve-measurement", children: "Read Test Guide" },
  name: "Renders as <a> when href is set",
};

export const Secondary: Story = { args: { variant: "secondary", children: "View Source" } };

export const Ghost: Story = { args: { variant: "ghost", children: "Skip" } };

export const Small: Story = { args: { size: "sm", children: "Quick Action" } };

export const Large: Story = { args: { size: "lg", children: "Begin Recovery Roadmap" } };

export const Disabled: Story = { args: { disabled: true, children: "Unavailable" } };
