const fs = require('fs')
const path = require('path')
const listComponents = require('./components')

const directory = path.resolve(__dirname, 'static')
const assets = path.resolve(__dirname, 'assets')
const output = path.join(directory, 'index.html')


function getTemplate () {
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(assets, 'template.html'), 'utf-8', (error, template) => {
			if (error) return reject(error)

			resolve(template)
		})
	})
}

function prepare () {
	return new Promise((resolve, reject) => {
		fs.mkdir(directory, error => {
			if (!error || error.code === 'EEXIST') resolve()
			else reject(error)
		})
	})
}

Promise
	.all([getTemplate(), listComponents(), prepare()])
	.then(([template, components]) => fs.writeFileSync(output, template
		.replace('= [] // #components', `= ${JSON.stringify(components)}`)))
