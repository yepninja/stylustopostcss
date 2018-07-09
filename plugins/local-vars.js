const postcss = require('postcss')
const valueParser = require('postcss-value-parser')

const pluginName = 'postcss-local-vars'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkRules(rule => {

		rule.walkRules(localVars)

		localVars(rule)
	})
})

function localVars (rule) {

	const vars = []

	// Collect variables
	rule.walkDecls(/^--[\w-]+/, decl => {
		const { prop: name, value } = decl
		vars.push({ name, value })
		decl.remove()
	})

	// Replace variables
	rule.walkDecls(decl => {
		const res = valueParser(decl.value)
			.walk(node => {
				if (node.type === 'function' && node.value === 'var') {
					const nodeVar = node.nodes[0]
					vars.forEach(({ name, value }) => {
						if (nodeVar.value === name) {
							node.type = 'word'
							node.value = value
							node.nodes = []
						}
					})
				}
			})
			.toString()
		decl.value = res
	})
}
