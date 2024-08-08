module.exports = function check(bracketsSequence, bracketsConfig) {
	const openingBrackets = []
	const closingBrackets = []

	bracketsConfig.forEach((brackets) => {
		openingBrackets.push(brackets[0])
		closingBrackets.push(brackets[1])
	})

	let dynamicBracketsSequence = ''

	for (const bracket of bracketsSequence) {
		const isOpeningBracket = openingBrackets.includes(bracket)
		const isClosingBracket = closingBrackets.includes(bracket)

		const lastBracket = dynamicBracketsSequence.at(-1) ?? null
		const lastBracketIndex = dynamicBracketsSequence.length - 1

		if (isOpeningBracket && isClosingBracket) {
			if (lastBracket === bracket) {
				dynamicBracketsSequence = dynamicBracketsSequence.slice(0, lastBracketIndex)
			} else {
				dynamicBracketsSequence += bracket
			}
		}

		if (isOpeningBracket && !isClosingBracket) {
			dynamicBracketsSequence += bracket
		}

		if (!isOpeningBracket && isClosingBracket) {
			if (openingBrackets.indexOf(lastBracket) !== closingBrackets.indexOf(bracket)) {
				return false
			}

			dynamicBracketsSequence = dynamicBracketsSequence.slice(0, lastBracketIndex)
		}
	}

	return dynamicBracketsSequence.length === 0
}
