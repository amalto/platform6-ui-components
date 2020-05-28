module.exports = {
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-knobs",
    "@storybook/addon-notes/register-panel",
  ],
  presets: ["@storybook/addon-docs/preset"],
  stories: [
    "../stories/**/*.stories.(js|ts|mdx)",
    "../src/**/*.stories.(js|ts|mdx)",
  ],
};
