const postcss = require('postcss')

const deps = [
	'/Users/evgeny-p/frontend/auto-core/react/components/variables.css',
	'/Users/evgeny-p/frontend/cabinet-core/react/applies.css',
]

const pluginName = 'postcss-stylus2cssnext-insert-deps'

module.exports = postcss.plugin(pluginName, (paths = deps) => root => {
	let appleis = false
	let vars = false
	root.walkAtRules('apply', () => {
		appleis = true
	})
	root.walkDecls(decl => {
		if (/var\(--/.test(decl.value)) {
			vars = true
		}
	})
	if (appleis) {
		root.prepend({
			name: 'import',
			params: '\'cabinet-core/react/components/applies.css\''
		})
	}
	if (vars) {
		root.prepend({
			name: 'import',
			params: '\'auto-core/react/components/variables.css\''
		})
	}
})
