const util = require('util')
const { createInterface } = require('readline')
const { createReadStream } = require('fs')
const Lintspaces = require('lintspaces')
const glob = util.promisify(require('glob'))

const lintspaces = new Lintspaces({
	indentation: 'spaces',
	spaces: 4,
})

glob('/Users/evgeny-p/frontend/www-crm/**/*.styl')
	.then(paths => {
		paths.forEach(path => {
			lintspaces.validate(path)
		})
		// Object
		// 	.keys(lintspaces.getInvalidFiles())
		// 	.forEach(path => {

		// 	})
		console.log(JSON.stringify(lintspaces.getInvalidFiles(), '', '\t'))
	})
