module.exports = line => {
	const bracketTest = /(\s*{\s*$)|(^\s*}\s*)/

	return line.replace(bracketTest, '')
}