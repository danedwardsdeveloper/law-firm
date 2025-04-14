// Updated Sunday 30 March 2025

interface OptimiserInput {
	base: string
	minimumLength: number
	maximumLength: number
	additionalPhraseOptions: string[]
	separator?: string
}

/**
 * Optimises a string by potentially adding an additional phrase within length constraints.
 *
 * @param param0 - The optimizer input parameters
 * @param param0.base - The base string to start with
 * @param param0.minimumLength - The minimum acceptable length for the resulting string
 * @param param0.maximumLength - The maximum acceptable length for the resulting string
 * @param param0.additionalPhraseOptions - Array of possible phrases to append to the base
 * @param param0.separator - Character(s) to place between base and additional phrase (defaults to space)
 * @returns An optimised string that meets the length constraints
 * @throws Error if constraints cannot be satisfied
 */
export function optimiseString({ base, minimumLength, maximumLength, additionalPhraseOptions, separator = ' ' }: OptimiserInput): string {
	if (maximumLength < minimumLength) {
		throw new Error('Maximum length cannot be less than minimum length')
	}

	if (base.length > maximumLength) {
		throw new Error('Base string already exceeds maximum length')
	}

	if (base.length >= minimumLength && additionalPhraseOptions.length === 0) {
		return base
	}

	if (base.length >= minimumLength && base.length <= maximumLength) {
		const sortedPhrases = [...additionalPhraseOptions].sort((a, b) => {
			const lengthWithA = base.length + separator.length + a.length
			const lengthWithB = base.length + separator.length + b.length

			if (lengthWithA > maximumLength && lengthWithB > maximumLength) {
				return lengthWithA - lengthWithB // Smaller excess is better
			}

			if (lengthWithA > maximumLength) return 1
			if (lengthWithB > maximumLength) return -1

			return lengthWithB - lengthWithA
		})

		for (const phrase of sortedPhrases) {
			const combinedLength = base.length + separator.length + phrase.length
			if (combinedLength <= maximumLength) {
				return base + separator + phrase
			}
		}

		return base
	}

	let bestPhrase: string | null = null
	let bestPhraseLength = -1

	for (const phrase of additionalPhraseOptions) {
		const combinedLength = base.length + separator.length + phrase.length

		if (combinedLength >= minimumLength && combinedLength <= maximumLength) {
			if (combinedLength > bestPhraseLength) {
				bestPhrase = phrase
				bestPhraseLength = combinedLength
			}
		} else if (combinedLength < minimumLength && combinedLength > bestPhraseLength) {
			bestPhrase = phrase
			bestPhraseLength = combinedLength
		}
	}

	if (bestPhrase !== null) {
		return base + separator + bestPhrase
	}

	if (base.length < minimumLength) {
		throw new Error('No combination can meet the minimum length requirement')
	}

	throw new Error('No combination can meet length requirements')
}

/**
 * Creates and returns a string optimiser function with preset length constraints and separator.
 * This factory function allows for creating reusable optimisers with specific configurations.
 *
 * @param param0 - Configuration options for the string optimiser
 * @param param0.minimumLength - The minimum length constraint for the resulting string
 * @param param0.maximumLength - The maximum length constraint for the resulting string
 * @param param0.separator - The separator to use between base and additional phrase (defaults to space)
 * @returns A function that optimises strings using the preset constraints
 */
export function initialiseStringOptimiser({
	minimumLength,
	maximumLength,
	separator = ' ',
}: { minimumLength: number; maximumLength: number; separator: string }): (input: {
	base: string
	additionalPhraseOptions: string[]
}) => string {
	return ({
		base,
		additionalPhraseOptions,
	}: {
		base: string
		additionalPhraseOptions: string[]
	}): string => {
		return optimiseString({
			base,
			minimumLength,
			maximumLength,
			additionalPhraseOptions,
			separator,
		})
	}
}
