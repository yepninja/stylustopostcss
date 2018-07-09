const postcss = require('postcss')
const valueParser = require('postcss-value-parser')
const color = require('color')

const pluginName = 'postcss-color-rgb2hex'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkDecls(decl => {
		decl.value = valueParser(decl.value)
			.walk(node => {
				// Replace RGA with HEX
				if (node.type === 'function' && node.value === 'rgb') {
					const nodes = node.nodes.filter(({ type }) => type === 'word').map(({ value }) => parseInt(value))
					const rgbColor = color.rgb(nodes)
					node.value = rgbColor.hex()
					node.type = 'word'
					node.nodes = []
				}
			}).toString()
	})
})
