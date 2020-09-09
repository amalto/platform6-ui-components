module.exports = {
  addons: [
    '@storybook/addon-essentials',
    // https://github.com/storybookjs/storybook/tree/next/addons/a11y
    '@storybook/addon-a11y',
  ],
  logLevel: 'debug',
  stories: ['../src/**/*.stories.@(ts|mdx)'],
};
