const { Parser, Evaluator, nodes } = require('stylus')
const readFile = require('./utils/read-file')

readFile('./test.styl')
	.then(styles => {
		const parser = new Parser(styles, {
			filename: 'test.styl'
		})
		const parsed = parser.parse()
		const evaluator = new Evaluator(parsed)
		// const visitProperty = evaluator.visitProperty

		// const stack = evaluator.evaluate()
		// evaluator.visitProperty = prop => {
		// 	visitProperty.call(evaluator, prop)
		// 	console.log(prop)
		// 	return prop
		// }

		const ast = evaluator.evaluate()

		console.log(ast)

	})
