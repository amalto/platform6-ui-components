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
    }
  ],
  globalStyle: 'src/global/global.scss',
  plugins: [
    sass({
      includePaths: [
        './node_modules/'
      ],
      injectGlobalPaths: [
        './src/global/_variable.scss',
        './node_modules/bulma/sass/utilities/_all.sass',
        './node_modules/bulma/sass/form/shared.sass'
        
      ]
    })
  ],
  devServer: {
    openBrowser: false
  }
};
