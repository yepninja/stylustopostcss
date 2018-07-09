const postcss = require('postcss')
const valueParser = require('postcss-value-parser')
const color = require('color')
const colorNames = require('color-name')

const pluginName = 'postcss-color-word2hex'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkDecls(decl => {
		decl.value = valueParser(decl.value)
			.walk(node => {
				// Replace named colors with HEX
				if (node.type === 'word' && colorNames[node.value]) {
					node.value = color.rgb(colorNames[node.value]).hex()
				}
			}).toString()
	})
})
