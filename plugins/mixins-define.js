const postcss = require('postcss')

const pluginName = 'postcss-stylus2cssnexter-mixins'

module.exports = postcss.plugin(pluginName, () => root => {
	const mixins = []
	root.walk(node => {
		if (node.type === 'comment') {
			node.remove()
		}
		if (node.type === 'rule' && node.selector.includes('()')) {
			node.selector = `--${node.selector.replace('()', ':')}`
			mixins.push(node)
			node.remove()
		}
	})
	root.prepend({
		selector: ':root',
		nodes: mixins,
	})
})