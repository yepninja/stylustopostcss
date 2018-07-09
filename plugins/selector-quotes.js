const postcss = require('postcss')
const parser = require('postcss-selector-parser')

const pluginName = 'postcss-fix-selector-quotes'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkRules(rule => {
		const {
			selector,
		} = rule

		const { result } = parser(selectors => {
			selectors.walkAttributes(selector => {
				const {
					value,
				} = selector
				if (value.includes('"')) {
					Object.assign(selector, {
						value: value.replace(/"/g, '\'')
					})
				}
			})
		}).process(selector)

		Object.assign(rule, {
			selector: result
		})
	})
})
