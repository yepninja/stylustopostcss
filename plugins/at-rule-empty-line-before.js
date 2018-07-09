const postcss = require('postcss')

const pluginName = 'postcss-fix-at-rule-empty-line-before'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkAtRules('import', atrule => {
		const { raws: { before } } = atrule
		const prev = atrule.prev()

		if (prev && prev.type === 'atrule') {
			atrule.raws.before = before.replace(/\n{2,}/, '\n')
		}
	})
})
