module.exports = line => {
	const varSeparator = / ?= ?/
	const attrSelector = /\[[\w-]+(\s+)?=(\s+)?".+"\]/
	const isVar = varSeparator.test(line)
	const isAttrSelector = attrSelector.test(line)

	if (isVar && !isAttrSelector) {
		
		const [prevSpace] = /^\s*/.exec(line)
		const variable = line.replace(varSeparator, ': ')
		const is$ = /^\s*\$/.test(variable)
		return is$ ? variable : `${prevSpace}$${variable.trim()}`
	}
	return line
}
