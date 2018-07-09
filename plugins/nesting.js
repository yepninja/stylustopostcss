const postcss = require('postcss')

const pluginName = 'postcss-stylus2cssnext-nesting'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkRules(rule => {
		const { selectors, parent } = rule

		if (parent.type !== 'root') {
			rule.selectors = selectors.map(selector => {
				if (/^(?!&)./.test(selector) && !/\s&/.test(selector)) {
					return `& ${selector}`
				}
				return selector
			})
		}
	})
})
