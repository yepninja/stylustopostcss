const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)
// const writeFile = util.promisify(fs.writeFile)
const glob = util.promisify(require('glob'))

const postcss = require('postcss')
const sugarss = require('sugarss')

module.exports = function (globPath, plugins = [], parser = sugarss) {
	glob(globPath)
		.then(paths => Promise.all(paths.map(path => readFile(path))))
		.then(files => files.map(file => file.toString()))
		.then(files => Promise.all(files.map(file => {
			return postcss(plugins).process(file, { parser })
		})))
		.then(results => {
			results.map(({ css }) => {
				console.log(css)
			})
		})
}