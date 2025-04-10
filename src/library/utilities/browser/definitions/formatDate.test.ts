import logger from '@/library/logger'
import { formatDate } from '@/library/utilities/browser'
import { describe, expect, test } from 'vitest'

const acceptedCases: { description: string; content: Date; expected: string }[] = [
	{
		description: 'Description',
		content: new Date('2025-01-01'),
		expected: '1 January, 2025',
	},
	{
		description: 'Description',
		content: new Date('2025-01-10'),
		expected: '10 January, 2025',
	},
]

describe('Format date', () => {
	const dateString = formatDate(acceptedCases[0].content)
	logger.info('Date string: ', dateString)

	for (const acceptedCase of acceptedCases) {
		test(`Accepts ${acceptedCase.description}`, () => {
			const dateString = formatDate(acceptedCase.content)
			expect(dateString).toEqual(acceptedCase.expected)
		})
	}
})

/* 
pnpm vitest src/library/utilities/browser/definitions/formatDate
*/
