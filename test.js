const readFiles = require('./utils/read-files')
const writeFile = require('./utils/write-file')
const readFile = require('./utils/read-file')
const fileName = require('./utils/filename')
const assert = require('assert')
// const logResults = require('./utils/log-results')
// const { promisify } = require('util')
const postcss = require('postcss')
const postcssConfig = require('./postcss.confg.js')
const stylus = require('stylus')

const process = require('./postcss')
const crmStyles = '/Users/evgeny-p/frontend/www-crm/react/components/**/*.styl'

const stylusProcess = (str, from, paths = []) => new Promise((resolve, reject) => {
	let preStylus = stylus(str).set('filename', from)
	paths.forEach(path => {
		preStylus = preStylus.import(path)
	})
	preStylus.render((err, css) => {
		if (err) reject(err)
		resolve(css)
	})
})
const stylusDeps = [
	'/Users/evgeny-p/frontend/auto-core/blocks/i-variables/i-variables.styl',
	'/Users/evgeny-p/frontend/cabinet-core/blocks/z-index/z-index.styl',
	'/Users/evgeny-p/frontend/cabinet-core/blocks/css-mixins/css-mixins.styl'
]

const getCss = ({ css }) => css

readFiles(crmStyles)
	.then(files => {
		return files
	})
	.then(files => Promise.all(files.map(fileObj => {
		return process(fileObj)
			.then(({ result: { css }, from }) => {
				const name = fileName(from)
				writeFile(`.files/cssnext/${name}.css`, css)

				writeFile(from.replace(/\.styl/, '.css'), css)

				const cssnextProd = postcss(postcssConfig('test'))
					.process(css, { from })
					.then(getCss)
				// .then(css => writeFile(`.files/css/${name}.css`, css))

				const stylusProd = readFile(from)
					.then(file => stylusProcess(file, from, stylusDeps))
					.then(css => postcss(postcssConfig('stylus')).process(css, { from }))
					.then(getCss)
				// .then(css => writeFile(`.files/stylus/${name}.css`, css))

				return Promise
					.all([cssnextProd, stylusProd])
					.then(([cssnextProd, stylusProd]) => ({
						cssnextProd,
						stylusProd,
						from
					}))
			})
			.catch(err => {
				console.log('ERROR in file: ', fileObj.path)
				console.error(err)
			})
	})))
	.then(results => {
		results.forEach(({
			cssnextProd,
			stylusProd,
			from
		}) => {
			const name = fileName(from)
			writeFile(`.files/css/${name}.css`, cssnextProd)
			writeFile(`.files/stylus/${name}.css`, stylusProd)
		})
		results.forEach(({
			cssnextProd,
			stylusProd,
			from
		}) => {
			assert.equal(cssnextProd, stylusProd, 'Failed: ' + from)	
		})
	})
	.catch(err => {
		console.error('Postcss err: ', err)
	})
