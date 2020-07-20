module.exports = {
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
  ],
  presets: ["@storybook/addon-knobs/preset"],
  stories: [
    "../stories/**/*.stories.@(ts|mdx)",
    "../src/**/*.stories.@(ts|mdx)",
  ],
};
