const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
    entry: {
        // the entry points of our app
        main: './index.tsx',

        // has to set the pdf.worker path else you won't be able to use the pdf framework
        'pdf.worker': 'node_modules/pdfjs-dist/build/pdf.worker.entry'
    },

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
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
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