import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0D0D0D" },
        { name: "panel", value: "#18181B" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          background: "#0D0D0D",
          color: "#FFFFFF",
          padding: "2rem",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
