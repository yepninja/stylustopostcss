const postcss = require('postcss')
const valueParser = require('postcss-value-parser')

const pluginName = 'postcss-stylus2cssnext-color-functions'

const funcs = {
	darken: 'blackness',
	lighten: 'whiteness',
	hue: 'hue',
	lightness: 'lightness',
	saturation: 'saturation',
}

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkDecls(decl => {
		const { value } = decl
		const parsedValue = valueParser(value)
		parsedValue.walk(node => {
			if (node.type === 'function') {

				// Check function type
				Object.keys(funcs).forEach(func => {
					if (node.value === func) {
						const { nodes } = node
						const lastIndex = nodes.length - 1
						const words = nodes.filter(({ type }) => /^(word|function)$/.test(type))

						// Do only if there is a value (not only color)
						if (words.length === 2 || words.length === 4) {
							const last = nodes[lastIndex]
							
							last.value = `${funcs[node.value]}(${last.value})`
							node.value = 'color'

							// Change separator before color-adjuster from comma to space
							const separator = nodes[lastIndex - 1]
							if (separator.type === 'div') {
								separator.type = 'space'
								separator.value = ' '
							}
						}
					}
				})
			}
		})
		decl.value = parsedValue.toString()
	})
})
