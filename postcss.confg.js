const atImport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const nested = require('postcss-nested')
const unprefix = require('postcss-unprefix')
const stylefmt = require('stylefmt')
const discardComments = require('postcss-discard-comments')
const localVars = require('./plugins/local-vars')
const pseudoColons = require('./plugins/pseudo')
const selectorQuotes = require('./plugins/selector-quotes')
const webpackPostcssTools = require('webpack-postcss-tools')

const { vars: variables } = webpackPostcssTools.makeVarMap('/Users/evgeny-p/frontend/auto-core/react/components/variables.css')

module.exports = (env = 'test') => {
	if (env === 'stylus') {
		return [
			discardComments,
			pseudoColons,
			unprefix,
			selectorQuotes,
			stylefmt,
		]
	}
	if (env === 'test') {
		return [
			// atImport,
			cssnext({
				features: {
					customProperties: {
						variables,
					},
					attributeCaseInsensitive: false,
					pseudoClassAnyLink: false,
					autoprefixer: false,
					nesting: false,
					initial: false,
				},
			}),
			// localVars,
			nested,

			discardComments,
			stylefmt,
		]
	}
}
