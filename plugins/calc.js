const postcss = require('postcss')
const valueParser = require('postcss-value-parser')

const pluginName = 'postcss-stylus2cssnext-calc'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkDecls(decl => {
		const parsedValue = valueParser(decl.value)
		parsedValue.walk(node => {
			if (node.type === 'function' && node.value === '') {
				node.value = 'calc'
			}
		})
		decl.value = parsedValue.toString()
	})
})
