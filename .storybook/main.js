module.exports = {
  addons: ["@storybook/addon-actions", "@storybook/addon-a11y"],
  presets: ["@storybook/addon-docs/preset", "@storybook/addon-knobs/preset"],
  stories: [
    "../stories/**/*.stories.@(ts|mdx)",
    "../src/**/*.stories.@(ts|mdx)",
  ],
};
