const { parse } = require('path')

module.exports = (path) => {
	const { name, dir } = parse(path)

	if (name === 'index') {
		const dirs = dir.split('/')
		return dirs[dirs.length - 1]
	}
	return name
}
