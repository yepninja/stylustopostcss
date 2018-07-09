const glob = require('glob')
const postcss = require('postcss')
const sugarss = require('sugarss')
const cssnext = require('postcss-cssnext')
const atImport = require('postcss-import')
const varsSass2css = require('./vars-sass2css')
const stylus = require('stylus')
const { resolve } = require('path')
const { readFile, writeFile } = require('fs')

const frontedPath = '/Users/evgeny-p/frontend/'

glob(`${frontedPath}/www-cabinet/**/*.styl`, (err, files) => {
	files.forEach(file => {
		readFile(file, (err, styles) => {
			console.log(name)
			postcss([
				varsSass2css
			])
				.process(styles, {
					parser: sugarss,
					from: file,
				})
				.then(({ css }) => {
					const outputPath = resolve(__dirname, `cssnext/${name}.css`)

					writeFile(outputPath, css)

					postcss()
						.process(css, {
							from: outputPath
						})
						.then(({ css }) => {
							writeFile(`css/${name}.css`, css)
						})
				})
			stylus(styles.toString())
				.import('./vars.styl')
				.render((err, css) => {
					if (err) throw err
					writeFile(`stylus/${name}.css`, css)
				})
		})
	})
})
