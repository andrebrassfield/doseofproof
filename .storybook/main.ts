import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../src/components/ui/**/*.stories.@(ts|tsx|mdx)",
    "../src/components/ui/**/*.mdx",
    "../src/**/*.mdx",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
