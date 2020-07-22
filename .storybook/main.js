module.exports = {
  addons: [
    // https://github.com/storybookjs/storybook/tree/master/addons/actions
    "@storybook/addon-actions",
    // https://github.com/storybookjs/storybook/tree/master/addons/a11y
    "@storybook/addon-a11y",
    // https://github.com/storybookjs/storybook/tree/master/addons/docs
    "@storybook/addon-docs",
    // https://github.com/storybookjs/storybook/tree/next/addons/controls
    "@storybook/addon-controls",
    // https://github.com/storybookjs/storybook/tree/master/addons/viewport
    "@storybook/addon-viewport/register",
  ],
  stories: [
    "../stories/**/*.stories.@(ts|mdx)",
    "../src/**/*.stories.@(ts|mdx)",
  ],
};
