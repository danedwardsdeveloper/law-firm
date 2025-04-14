import type { PayloadMedia } from './payload'

export interface PayloadArticle {
	id: number
	title: string
	slug: string
	metatitle: string
	excerpt: string
	metadescription: string
	featuredImage: PayloadMedia
	featuredImagePlaceholder: string
	policyPage?: boolean | null
	companyPage?: boolean | null
	content: {
		root: {
			type: string
			children: {
				type: string
				version: number
				[k: string]: unknown
			}[]
			direction: ('ltr' | 'rtl') | null
			format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
			indent: number
			version: number
		}
		[k: string]: unknown
	}
	updatedAt: string
	createdAt: string
}
