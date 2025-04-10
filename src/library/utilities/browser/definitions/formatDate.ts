import { format } from 'date-fns'

/**
 * @example 10 January, 2025
 */
export function formatDate(date: Date): string {
	const year = format(date, 'yyyy')
	const dayAndMonth = format(date, 'd MMMM')
	return `${dayAndMonth}, ${year}`
}
