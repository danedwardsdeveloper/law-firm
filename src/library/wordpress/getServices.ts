import type { WordPressMediaDetail, WordPressServiceApiResponse } from '@/types'
import type { Service } from '@/types'
import urlJoin from 'proper-url-join'
import { wordpressRestApi } from '../environment/publicVariables'
import logger from '../logger'
import { downloadImage } from './downloadImage'

let servicesCache: Service[] | null = null

export async function getServices(): Promise<Service[]> {
	if (servicesCache) return servicesCache

	try {
		const servicesResponse = await fetch(urlJoin(wordpressRestApi, 'services'), {
			headers: { 'Content-Type': 'application/json' },
		})

		if (!servicesResponse.ok) throw new Error(`getServices fetch response not ok: ${servicesResponse.status}`)

		const servicesData: WordPressServiceApiResponse = await servicesResponse.json()

		const processedServices: Service[] = []

		for (const wordpressService of servicesData) {
			if (!wordpressService.featured_media) {
				logger.info('getServices: No featured image found for ', wordpressService.slug)
				continue
			}

			try {
				const mediaUrl = urlJoin(wordpressRestApi, `media/${wordpressService.featured_media}`)
				const mediaResponse = await fetch(mediaUrl, {
					headers: { 'Content-Type': 'application/json' },
				})

				if (!mediaResponse.ok) {
					logger.error(`Media response not ok for service ${wordpressService.slug}:`, mediaResponse.status)
					continue
				}
				const mediaData: WordPressMediaDetail = await mediaResponse.json()

				await downloadImage({
					imageFileName: mediaData.media_details.file,
					saveToPublic: true,
					saveToApp: false,
					subFolder: 'services',
				})

				processedServices.push({
					title: wordpressService.title.rendered,
					slug: wordpressService.slug,
					content: wordpressService.content.rendered,
					photo: `/images/wordpress/services/${mediaData.media_details.file}`,
				})
			} catch (error) {
				logger.error(`Error fetching media for post ${wordpressService.id}:`, error)
			}
		}

		const deepCopy = JSON.parse(JSON.stringify(servicesData))
		servicesCache = deepCopy

		return processedServices
	} catch (error) {
		logger.error('getServices error: ', error)
		return []
	}
}

export async function getServiceBySlug(slug: string) {
	const allServices = await getServices()
	return allServices.find((service) => service.slug === slug)
}
