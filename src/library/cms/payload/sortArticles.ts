import type { PayloadArticle } from '@/types'

/**
 * Sorting function that groups articles into normal, company, and policy categories
 * Only used by getServices, so it isn't exported from the barrel
 * @param articles - Array of articles
 * @returns Sorted array in order: normal, company, policy - each sub-sorted by date
 */
export function sortArticles(articles: PayloadArticle[]) {
	return [...articles].sort((a, b) => {
		const aType = a.policyPage ? 'policy' : a.companyPage ? 'company' : 'normal'
		const bType = b.policyPage ? 'policy' : b.companyPage ? 'company' : 'normal'

		if (aType !== bType) {
			if (aType === 'normal') return -1
			if (aType === 'company' && bType === 'normal') return 1
			if (aType === 'company' && bType === 'policy') return -1
			if (aType === 'policy') return 1
		}

		const aDate = new Date(a.updatedAt || a.createdAt)
		const bDate = new Date(b.updatedAt || b.createdAt)
		return bDate.getTime() - aDate.getTime()
	})
}
