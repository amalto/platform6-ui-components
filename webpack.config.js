/**
 * Custom Webpack config for Storybook
 * https://storybook.js.org/configurations/custom-webpack-config
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {

    entry: [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://0.0.0.0:6006',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry points of our app
        './typescript/main.tsx',
        './public/sass/main.scss'
    ],

    output: {
        // the output bundle
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/assets/generated'),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/assets/generated/'
    },

    devtool: 'eval',

    devServer: {
        // activate hot reloading
        hot: true,
        host: "0.0.0.0",

        // Serve custom documentation
        contentBase: path.resolve(__dirname, 'public'),

        // Serve documentation generated from TypeDoc
        // contentBase: path.resolve(__dirname, 'public/assets/generated/docs/'),

        compress: true,
        port: 6006,
        inline: true
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: path.resolve(__dirname, './typescript'),
                exclude: path.resolve(__dirname, './components'),
                loaders: ['ts-loader']
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
            }
        ]
    },

    resolve: {
        extensions: ['.webpack.js', '.scss', '.css', '.js', '.ts', '.tsx']
    },

    node: {
        fs: 'empty'
    },

    plugins: [
        // activates HMR
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),

        // Generating the TypeDoc files
        // new TypedocWebpackPlugin({
        //     name: 'b2-common-components',
        //     theme: 'minimal',
        //     mode: 'file',
        //     out: './docs/',
        //     module: 'commonjs',
        //     target: 'ES5',
        //     jsx: 'react',
        //     exclude: '**/node_modules/**/*.*',
        //     excludePrivate: true,
        //     excludeExternals: true
        // }, [
        //         './components/action-button/typescript',
        //         './components/code-editor/typescript'
        //     ]
        // ),

        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
            disable: true
        })
    ]
}