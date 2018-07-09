const postcss = require('postcss')

const pluginName = 'postcss-stylus2cssnext-mixin'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkRules(rule => {
		const { selector } = rule
		const mixinRex = /[\w-]+\(\)\n/
		if (!rule.nodes.length && mixinRex.test(selector)) {
			const [mixin, ...decls] = selector.split('\n')
			rule.parent.prepend({
				name: 'apply',
				params: `--${mixin.replace('()', '')}`
			}, ...decls)
			rule.remove()
		}
	})
})
