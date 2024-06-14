const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(__dirname, './components'),
          path.resolve(__dirname, './typescript'),
        ],
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
        include: path.resolve(__dirname, './public/sass/'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [{ loader: 'html-loader' }, { loader: 'markdown-loader' }],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.webpack.js', '.scss', '.css', '.js', '.ts', '.tsx'],
    fallback: {
      "fs": false,
    }
  },
};
