import type { StaticImageData } from 'next/image'
import type { ServiceName } from './services'

export interface Testimonial {
	anchor: string
	service: ServiceName
	writer: {
		name: string
		role: string
	}
	company?: string
	photo: StaticImageData
	altText: string
	content: string[]
}
