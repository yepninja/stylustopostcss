const postcss = require('postcss')

const pluginName = 'postcss-selector-pseudo-element-colon-notation-fix'

module.exports = postcss.plugin(pluginName, () => root => {
	const pseudSelectorRex = /:(before|after)/
	root.walkRules(pseudSelectorRex, rule => {
		rule.selectors = rule.selectors
			.filter(selector => pseudSelectorRex.test(selector))
			.map(selector => {
				const isTrue = /::/.test(selector)
				if (!isTrue) {
					return selector.replace(pseudSelectorRex, ':$&')
				}
				return selector
			})
	})
})
