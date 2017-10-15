const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../components')

function listComponents () {
	return new Promise((resolve, reject) => {
		fs.readdir(root, (error, components) => {
			if (error) return reject(error)

			resolve(components
				.map(parseComponent)
				.filter(component => component !== undefined))
		})
	})
}

function parseComponent (name) {
	try {
		const component = require(path.join(root, name, 'package.json'))

		return {
			name: component.name,
			displayName: component.displayName,
			description: component.description,
			version: component.version
		}
	} catch (_) {}
}

module.exports = listComponents
