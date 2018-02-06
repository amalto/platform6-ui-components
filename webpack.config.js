/**
 * Custom Webpack config for Storybook
 * https://storybook.js.org/configurations/custom-webpack-config
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {

    devtool: 'eval',

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, './components'),
                    path.resolve(__dirname, './examples'),
                    path.resolve(__dirname, './typescript')
                ],
                loaders: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ],
                include: path.resolve(__dirname, './public/sass/')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.md$/,
                use: [
                    { loader: 'html-loader' },
                    { loader: 'markdown-loader' }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.webpack.js', '.scss', '.css', '.js', '.ts', '.tsx']
    },

    node: {
        fs: 'empty'
    }
}