module.exports = {
  stories: ['../stories/**/*.stories.(js|ts|mdx)', '../src/**/*.stories.(js|ts|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-viewport/register'
  ]
};
