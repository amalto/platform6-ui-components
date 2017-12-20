/**
 * Custom Webpack config for Storybook
 * https://storybook.js.org/configurations/custom-webpack-config
 */

const path = require('path')
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env)

    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            include: path.resolve(__dirname, '../typescript/'),
            loaders: ['ts-loader']
        },
        {
            test: /\.md$/,
            use: "raw-loader"
        }
    )

    config.resolve.extensions.push('.ts', '.tsx')

    config.devtool = 'eval'

    return config
}