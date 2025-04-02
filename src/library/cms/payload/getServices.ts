import { payloadCmsBase } from '@/library/environment/publicVariables'
import { payloadCmsSecret } from '@/library/environment/serverVariables'
import logger from '@/library/logger'
import { deReference, downloadImage } from '@/library/utilities/server'
import type { PayloadMedia, Service } from '@/types'
import urlJoin from 'proper-url-join'

let servicesCache: Service[] | undefined = undefined

export async function getServices(): Promise<Service[]> {
	if (servicesCache) return servicesCache

	try {
		const response = await fetch(urlJoin(payloadCmsBase, 'api', 'services'), {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${payloadCmsSecret}`,
			},
		})

		if (!response.ok) {
			throw new Error(`Failed to get services data. Status: ${response.status}, ${response.statusText}`)
		}

		const data = await response.json()

		const processedServices: Service[] = []

		for (const document of data.docs) {
			try {
				const media = deReference<PayloadMedia>(document.featuredImage)

				const imageFileName = media.url.split('/').pop() || ''

				await downloadImage({
					imageFileName,
					subFolder: 'services',
					cms: 'payload',
				})

				processedServices.push({
					...document,
					featuredImage: {
						...media,
						url: urlJoin('/images/payload/services', imageFileName, {
							leadingSlash: true,
						}),
					},
				} as Service)
			} catch (error) {
				logger.error(`Error processing service "${document.serviceType || 'unknown'}":`, error)
			}
		}

		if (processedServices.length === 0) {
			throw new Error('getServices: no valid services found')
		}

		servicesCache = processedServices

		return servicesCache
	} catch (error) {
		const errorMessage = `Error fetching services: ${error instanceof Error ? error.message : String(error)}`
		throw new Error(errorMessage)
	}
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
	const services = await getServices()
	const service = services.find((service) => service.slug === slug)
	return service || undefined
}
