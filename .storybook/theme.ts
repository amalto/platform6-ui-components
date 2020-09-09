import { create } from '@storybook/theming';

export const platform6 = create({
  base: 'light',

  // Storybook-specific color palette
  colorPrimary: '#fb9248',
  colorSecondary: '#61a653',

  // UI
  appBg: 'hsl(0, 0%, 96%)',
  appContentBg: 'hsl(0, 0%, 100%)',
  appBorderColor: 'hsl(0, 0%, 86%)',
  appBorderRadius: 2,

  // Fonts
  fontBase: '"Open Sans", helvetica, arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'hsl(0, 0%, 29%)',
  textInverseColor: 'hsl(0, 0%, 48%)',

  // Toolbar default and active colors
  barTextColor: 'hsl(0, 0%, 29%)',
  barSelectedColor: '#61a653',
  barBg: 'hsl(0, 0%, 100%)',

  // Form colors
  inputBg: 'hsl(0, 0%, 100%)',
  inputBorder: 'hsl(0, 0%, 86%)',
  inputTextColor: 'hsl(0, 0%, 21%)',
  inputBorderRadius: 2,

  // Brand
  brandTitle: 'Platform 6 Components',
  brandUrl: 'https://documentation.amalto.com/platform6-ui-components-doc',
});
