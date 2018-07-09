const readFiles = require('./utils/read-files')
const writeFile = require('./utils/write-file')
// const logResults = require('./utils/log-results')
// const path = require('path')

const process = require('./postcss')
const crmStyles = '/Users/evgeny-p/frontend/www-crm/**/*.styl'

readFiles(crmStyles)
	.then(files => Promise.all(files.map(fileObj => process(fileObj))))
	.then((results) => {
		results
		return Promise.all(
			results.map(({ from, result: { css } }) => {
				return writeFile(from.replace(/.styl$/, '.css'), css)
			})
		)
	})
	.then(() => {
		console.log('DONE!')
	})
