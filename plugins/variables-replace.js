const postcss = require('postcss')
const valueParser = require('postcss-value-parser')
const decamelize = require('decamelize')
// const { parse, resolve } = require('path')
const { readFileSync } = require('fs')

const pluginName = 'postcss-stylus2cssnext-variables-replace'

const deps = [
	'/Users/evgeny-p/frontend/auto-core/react/components/variables.css',
]

module.exports = postcss.plugin(pluginName, (paths = deps) => root => {

	// GET variables from current file
	const variables = searchVars(root)

	// GET variables from imported files
	paths.forEach(path => {
		const importedCSS = readFileSync(path)
		const importedRoot = postcss.parse(importedCSS, { from: path })
		Object.assign(variables, searchVars(importedRoot))
	})

	// REPLACE variables 
	root.walkDecls(decl => {
		decl.value = valueParser(decl.value)
			.walk(node => {
				if (node.type === 'word') {
					const value = decamelize(node.value.replace(/^\$/, ''), '-')
					if (variables[value]) {
						node.value = `var(--${value})`
					}
				}
			}).toString()
	})
})

const searchVars = (root) => {
	const vars = {}
	root.walkDecls(/^--/, (decl) => {
		const { value } = decl
		const prop = decamelize(decl.prop.replace(/^--/, ''), '-')
		vars[prop] = value
		decl.prop = `--${prop}`
	})
	return vars
}
