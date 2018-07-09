module.exports = (plugins) => (css) => {
	return css
		.split('\n')
		.map((line, lineIndex) => {
			plugins.forEach(plugin => {
				line = plugin(line, lineIndex)
			})
			return line
		})
		.join('\n')
}
