const postcss = require('postcss')
const valueParser = require('postcss-value-parser')

const pluginName = 'postcss-wrap-urls'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkRules(rule => {
		rule.walkDecls(decl => {
			decl.value = valueParser(decl.value)
				.walk(({ type, value, nodes }) => {
					if (type === 'function' && value === 'url' && nodes && nodes.length) {
						const url = nodes[0]
						if (!url.quote) {
							url.value = `'${url.value}'`
						}
					}
				})
				.toString()
		})
	})
})
