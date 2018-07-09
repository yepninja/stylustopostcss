const properties = require('./properties')

module.exports = line => {
	const maybePropReg = /^\s+[\w-]+/

	if (maybePropReg.test(line)) {
		const maybeProp = line.match(maybePropReg)[0].trim()
		const isProp = properties.includes(maybeProp)
		// const isTrueProp = RegExp(maybeProp + ':').test(line)

		if (isProp) {
			return line.replace(RegExp(`${maybeProp}:? ?`), `${maybeProp}: `)
		}
	}

	// const propTest = /^\s*[\w-]+(:| )/
	// const truePropTest = /^\s*[\w-]+(?=[:()])/
	// const isProp = propTest.test(line)
	// const isTrueProp = truePropTest.test(line)

	// if (isProp && !isTrueProp) {
	// 	const [match, prop, value] = /(^\s*[\w-()]+)(.+)/.exec(line)
	// 	return `${prop}:${value}`
	// }

	// if (isProp && /\w:\w/.test(line)) {
	// 	return line.replace(':', ': ')
	// }

	return line
}
