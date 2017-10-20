/**
 * Custom Webpack config for Storybook
 * https://storybook.js.org/configurations/custom-webpack-config
 */

module.exports = (config, type) => {
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		loader: require.resolve('ts-loader')
	})
	config.resolve.extensions.push('.ts', '.tsx')

	return config
}
