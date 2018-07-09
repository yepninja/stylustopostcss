const postcss = require('postcss')
const valueParser = require('postcss-value-parser')

const pluginName = 'postcss-rgba2color'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkDecls(decl => {
		decl.value = valueParser(decl.value)
			.walk(node => {
				const { type, value, nodes } = node
				// Replace named colors with HEX
				if (type === 'function' && value === 'rgba' && nodes.length === 3) {

					// Change function
					node.value = 'color'

					// Change div
					nodes[1].type = 'space'
					nodes[1].value = ' '

					// Change transform
					nodes[2].type = 'func'
					nodes[2].value = `a(${nodes[2].value})`
				}
			}).toString()
	})
})
