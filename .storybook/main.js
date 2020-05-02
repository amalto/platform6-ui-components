module.exports = {
  stories: ['../stories/**/*.stories.(js|ts|mdx)', '../src/**/*.stories.(js|ts|mdx)'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-docs/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-viewport/register'
  ]
};
