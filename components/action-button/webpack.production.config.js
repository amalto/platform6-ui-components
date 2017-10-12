const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

module.exports = {
    entry: [
        // the entry points of our app
        './typescript/index.tsx',
        './sass/index.scss'

    ],

    output: {
        // the output bundle
        filename: 'index.js',
        path: resolve(__dirname),
        libraryTarget: 'umd',
        library: 'ActionButton'
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'classnames': 'classNames'
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};