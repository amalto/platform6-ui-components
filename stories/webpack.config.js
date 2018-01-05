/**
 * Custom Webpack config for Storybook
 * https://storybook.js.org/configurations/custom-webpack-config
 */

const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);

    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, '../typescript/'),
            loaders: ['ts-loader']
        },
        {
            test: /\.md$/,
            use: [
                {
                    loader: 'raw-loader',
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
            ],
            include: path.resolve(__dirname, '../public/sass/')
        }
    );

    config.resolve.extensions.push('.scss', '.css', '.md', '.ts', '.tsx');

    config.devtool = 'eval';

    return config
};