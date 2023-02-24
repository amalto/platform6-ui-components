const { resolve } = require('path');

module.exports = {
  entry: {
    // has to set the pdf.worker path else you won't be able to use the pdf framework
    'pdfjs.worker': 'pdfjs-dist/build/pdf.worker.js',

    // the entry points of our app
    main: './index.tsx',
  },

  output: {
    // the output bundle
    filename: 'index.js',
    path: resolve(__dirname, './build'),
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/build/',
  },

  resolve: {
    extensions: ['.webpack.js', '.scss', '.css', '.js', '.ts', '.tsx'],
  },
  node: {
    fs: 'empty',
  },

  externals: {
    jquery: 'jQuery',
    pikaday: 'Pikaday',
    moment: 'moment',
  },

  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /test/],
      },
    ],
  },
  devtool: 'source-map',
};
