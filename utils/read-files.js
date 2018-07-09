const fs = require('fs')
const util = require('util')

const glob = util.promisify(require('glob'))
const readFile = util.promisify(fs.readFile)

const readAllFiles = paths => Promise.all(paths.map(readFilesByPath))

const readFilesByPath = path =>
	readFile(path)
		.then(file => ({ path, file }))

const filesToString = files => files.map(fileToString)

const fileToString = ({ file, path }) => ({
	path,
	file: file.toString(),
})

const readFiles = globPath =>
	glob(globPath)
		.then(readAllFiles)
		.then(filesToString)

module.exports = readFiles
