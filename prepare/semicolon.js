module.exports = line => {
	const semicolonTest = /;\s*$/

	return line.replace(semicolonTest, '')
}