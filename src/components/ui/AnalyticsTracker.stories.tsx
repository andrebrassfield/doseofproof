import type { Meta, StoryObj } from "@storybook/react";
import { AnalyticsTracker } from "./AnalyticsTracker";

const meta: Meta<typeof AnalyticsTracker> = {
  title: "UI/AnalyticsTracker",
  component: AnalyticsTracker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Invisible client component that fires a Fathom analytics event on mount. Render once on a page to log a page view, or pair with a UI event (e.g. inside a button onClick) to log an interaction. Renders nothing to the DOM.",
      },
    },
  },
  argTypes: {
    event: { control: "text", description: "Fathom event name" },
    params: { control: "object", description: "Optional event properties" },
  },
  args: { event: "page_view" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnalyticsTracker>;

export const PageView: Story = {};

export const WithParams: Story = {
  args: {
    event: "lead_magnet_download",
    params: { source: "storybook", slug: "testing-roadmap" },
  },
};
