const {
    resolve
} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://0.0.0.0:8085',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry points of our app
        './typescript/index.tsx',
        './sass/index.scss'

    ],

    output: {
        // the output bundle
        filename: 'index.js',
        path: resolve(__dirname),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/'
    },

    devtool: 'eval',

    devServer: {
        // activate hot reloading
        hot: true,
        contentBase: resolve(__dirname, 'public'),
        compress: true,
        host: "0.0.0.0",
        port: 8085,
        inline: true
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.tsx?$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'ts-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },

    node: {
        fs: 'empty'
    },

    plugins: [
        // activates HMR
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin()
    ],
};