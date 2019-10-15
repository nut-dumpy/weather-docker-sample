const getKey = (params) => {
	const today = new Date()
	/**
	 * @param {number} h hour of day to convert
	 */
	const mapHoursToStage = (h) => {
		if (h < 6)
			return 1
		if (h < 11)
			return 2
		if (h < 16)
			return 3
		if (h < 21)
			return 4
		return 5
	}
	const dayStage = mapHoursToStage(today.getHours())
	return `${today.getFullYear()}/${today.getMonth()}/${today.getDay()}/${dayStage}:${params.query}`;
}

const lowerCase = (str) => {
	if (typeof str === 'string')
		return str.toLocaleLowerCase()
	return str
}

module.exports.getKey = getKey
module.exports.lowerCase = lowerCase
