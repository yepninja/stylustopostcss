
const Lintspaces = require('lintspaces')
const lintspaces = new Lintspaces({
	indentation: 'spaces',
	spaces: 4,
})

const prepare = require('./prepare')
const prepareTrim = require('./prepare/trim')
const prepareMixin = require('./prepare/mixin')
const prepareVars = require('./prepare/variables')
const prepareColon = require('./prepare/colon')
const prepareSemicolon = require('./prepare/semicolon')
const prepareBrackets = require('./prepare/brackets')
const prepareSpaces = require('./prepare/spaces')
const prepares = [
	prepareTrim,
	prepareMixin,
	prepareVars,
	prepareColon,
	prepareSemicolon,
	prepareBrackets,
]

const postcss = require('postcss')
const parser = require('sugarss')
const unprefix = require('postcss-unprefix')
// const stylusMixin = require('./plugins/mixin')
// const stylusNesting = require('./plugins/nesting')
const stylusVarsDefine = require('./plugins/variables-define')
const stylusVarsReplace = require('./plugins/variables-replace')
const stylusMultiSelector = require('./plugins/multi-selector')
// const stylusInsertDeps = require('./plugins/insert-deps')
const stylusNegative = require('./plugins/negative')
const stylusColorFunc = require('./plugins/color-functions')
const stylusCalc = require('./plugins/calc')
const rgba2color = require('./plugins/rgba2color')
const stylusPlugins = [
	// stylusMixin,
	stylusMultiSelector,
	// stylusNesting,
	stylusVarsDefine,
	stylusVarsReplace,
	// stylusInsertDeps,
	stylusNegative,
	stylusColorFunc,
	stylusCalc,
	rgba2color,
	unprefix,
]

const stylefmt = require('stylefmt')
const fixPseudoColon = require('./plugins/pseudo')
const colorWord2Hex = require('./plugins/color-word2hex')
const colorRgb2hex = require('./plugins/color-rgb2hex')
const commentWhitespaceInside = require('./plugins/comment-whitespace-inside')
const wrapUrl = require('./plugins/wrap-urls')
const atRuleEmptyLineBefore = require('./plugins/at-rule-empty-line-before')
const selectorQuotes = require('./plugins/selector-quotes')
const fmtPlugins = [
	colorWord2Hex,
	colorRgb2hex,
	fixPseudoColon,
	commentWhitespaceInside,
	wrapUrl,
	selectorQuotes,
	stylefmt,
	atRuleEmptyLineBefore,
]

module.exports = ({
	file: styles,
	path: from,
}) => {
	lintspaces.validate(from)
	const css = prepare(
		prepares.concat(
			prepareSpaces(
				lintspaces.getInvalidFiles(),
				from
			)
		)
	)(styles.toString())

	return postcss(stylusPlugins)
		.process(css, { parser, from })
		.then(result => {
			return postcss(fmtPlugins).process(result.css)
		})
		.then(result => ({
			result,
			from,
		}))
}
