import type { StaticImageData } from 'next/image'
import type { Service } from './service'

export interface Testimonial {
	service: Service
	writer: {
		name: string
		role: string
	}
	company?: string
	photo: StaticImageData
	altText: string
	content: string[]
}
