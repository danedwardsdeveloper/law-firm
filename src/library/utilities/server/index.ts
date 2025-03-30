import { initialiseStringOptimiser } from './definitions/stringOptimiser'

export const optimiseTitle = initialiseStringOptimiser({
	minimumLength: 50,
	maximumLength: 65,
	separator: ' | ',
})

export const optimiseDescription = initialiseStringOptimiser({
	minimumLength: 70,
	maximumLength: 155,
	separator: ' | ',
})
