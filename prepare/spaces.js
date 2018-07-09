// const { resolve } = require('path')

module.exports = (report, from) => (line, index) => {
	const fromReport = report[from]
	if (fromReport) {
		const lineReport = fromReport[++index]
		if (lineReport) {
			const [{
				payload,
			}] = lineReport

			if (payload) {
				return line.replace(/^ +/, ' '.repeat(payload.expected))
			} else if (!payload) {
				const startTabsReg = /^\t+/
				const { length: startTagsCount } = line.match(startTabsReg)[0].match(/\t/g)
				return line.replace(startTabsReg, ' '.repeat(4).repeat(startTagsCount))
			}
			return line
		}
		return line
	}
	return line
}
