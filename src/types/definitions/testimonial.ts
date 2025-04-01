import type { StaticImageData } from 'next/image'
import type { ServiceName } from './service'

export interface Testimonial {
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
