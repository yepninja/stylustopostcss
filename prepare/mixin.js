module.exports = line => {
	const mixinReg = /[\w-]+\(\)/
	if (mixinReg.test(line)) {
		return line.replace(mixinReg, mixin => `@apply --${mixin.replace('()', '')};`)
	}
	return line
}
