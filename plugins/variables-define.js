const postcss = require('postcss')

const pluginName = 'postcss-stylus2cssnext-variables-define'


module.exports = postcss.plugin(pluginName, () => root => {
	let rootNodes = []
	root.walkDecls(/^\$[\w-]+/, decl => {

		// Remove $
		decl.prop = `--${decl.prop.replace(/^\$/, '')}`

		if (decl.parent.type === 'root') {
			rootNodes.push(decl)
		} else {
			decl.parent.prepend(decl.clone())
		}

		deleteComments(decl)
		decl.remove()
	})

	if (rootNodes.length) {
		root.prepend({
			selector: ':root',
			nodes: rootNodes,
		})
	}

})

function deleteComments(node) {
	prevComment(node.prev(), () => {})
}

// function prevComments(node) {
// 	const comments = []
// 	prevComment(node.prev(), comment => {
// 		comments.unshift(comment)
// 	})
// 	return comments
// }

function prevComment(node, cb) {
	if (node && node.type === 'comment') {
		cb(node)
		prevComment(node.prev(), cb)
		node.remove()
	}
}
