/* eslint-disable import/no-extraneous-dependencies */
import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import autoprefixer from 'autoprefixer';
import { generateCustomElementsJson } from './scripts/customElementsGenerator';
/* eslint-enable import/no-extraneous-dependencies */

export const config: Config = {
  namespace: 'platform6-components',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: './components/**/locales/*.i18n*.json',
          dest: './locales/',
        },
      ],
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    reactOutputTarget({
      componentCorePackage: '@platform6/components',
      proxiesFile: '../react/src/components.ts',
      loaderDir: './loader',
    }),
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-custom',
      generator: generateCustomElementsJson,
    },
  ],
  globalScript: 'src/global/init.ts',
  globalStyle: 'src/global/base.scss',
  plugins: [
    sass({
      includePaths: ['./node_modules/'],
      injectGlobalPaths: [
        './src/global/_variable.scss',
        './src/global/_functions.scss',
        './src/global/_colors.scss',
        // "./node_modules/bulma/sass/utilities/_all.sass",
        './src/global/_global.scss',
      ],
    }),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
  devServer: {
    openBrowser: false,
  },
};
