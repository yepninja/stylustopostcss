const postcss = require('postcss')

const pluginName = 'postcss-stylus2cssnext-multi-selector'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkRules(rule => {
		const { selector } = rule

		if (/[^,]\n/.test(selector)) {
			rule.selector = selector.replace(/[^,]\n/g, (match) => {
				return match.replace(/\n/, ',\n')
			})
		}
	})
})