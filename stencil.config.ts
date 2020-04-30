import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'platform6-components',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass({
      includePaths: [
        './node_modules/'
      ],
      injectGlobalPaths: [
        './src/global/_variable.scss',
        './node_modules/bulma/sass/utilities/initial-variables.sass',
        './node_modules/bulma/sass/utilities/functions.sass',
        './node_modules/bulma/sass/utilities/derived-variables.sass',
        './node_modules/bulma/sass/utilities/animations.sass',
        './node_modules/bulma/sass/utilities/mixins.sass',
        './node_modules/bulma/sass/utilities/controls.sass',
      ]
    })
  ],
  devServer: {
    openBrowser: false
  }
};
