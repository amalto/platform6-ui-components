const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');

var packageJson = require('./package.json')

module.exports = {
    entry: [
        // the entry points of our app
        './typescript/index.tsx'
    ],

    output: {
        // the output bundle
        filename: 'bundle.js',
        path: resolve(__dirname, './build'),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/build/'
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },

    module: {
        rules: [
            {
                test: /\.ts|.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/
            }
        ]
    },

    node: {
        fs: 'empty'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};