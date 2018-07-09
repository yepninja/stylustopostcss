const postcss = require('postcss')

const pluginName = 'postcss-stylus2cssnext-negative'

module.exports = postcss.plugin(pluginName, () => root => {
	root.walkDecls(decl => {
		const { value } = decl
		const negativeTest = /-1 \* /

		if (negativeTest.test(value)) {
			decl.value = value.replace(negativeTest, '-')
		}
	})
})
