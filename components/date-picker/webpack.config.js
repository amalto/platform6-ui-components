const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
    entry: [
        // the entry points of our app
        './index.tsx'
    ],

    output: {
        // the output bundle
        filename: 'index.js',
        path: resolve(__dirname, './build'),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/build/'
    },

    resolve: {
        extensions: ['.webpack.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },

    externals: {
        'jquery': 'jQuery',
        'pikaday': 'Pikaday',
        'moment': 'moment'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /test/]
            }
        ]
    },
    devtool: 'source-map',
    node: {
        fs: 'empty'
    }
};