const postcss = require('postcss')

const pluginName = 'postcss-fix-comment-whitespace-inside'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkComments(comment => {
		if (comment.raws.left === '') {
			comment.raws.left = ' '
		}
		comment.raws.before = comment.raws.before.replace('\n\n', '\n')
	})
})
