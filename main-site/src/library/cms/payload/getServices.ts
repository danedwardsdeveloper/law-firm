import { payloadCmsBase } from '@/library/environment/publicVariables'
import { payloadCmsSecret } from '@/library/environment/serverVariables'
import logger from '@/library/logger'
import { downloadImage } from '@/library/utilities/server'
import type { Service } from '@/types'
import urlJoin from 'proper-url-join'

let servicesCache: Service[] | undefined = undefined

export async function getServices(): Promise<Service[]> {
	if (servicesCache) return servicesCache

	try {
		const cacheBust = `?t=${Date.now()}`
		const response = await fetch(urlJoin(payloadCmsBase, 'api/services', cacheBust), {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${payloadCmsSecret}`,
			},
		})

		if (!response.ok) {
			logger.warn('Fetch services response not okay. Is the Payload server running?')
			return []
		}

		const data = await response.json()

		const processedServices: Service[] = []

		for (const document of data.docs) {
			try {
				const imageFileName = document.featuredImage.filename

				await downloadImage({
					imageFileName,
					subFolder: 'services',
					cms: 'payload',
				})

				processedServices.push({
					...document,
					featuredImage: {
						url: urlJoin('/images/payload/services', imageFileName, {
							leadingSlash: true,
						}),
					},
				} as Service)
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : `Error processing service "${document.serviceType || 'unknown'}":`
				logger.error(errorMessage)
			}
		}

		if (processedServices.length === 0) {
			logger.warn('No valid services found')
			return []
		}

		servicesCache = processedServices

		return servicesCache
	} catch (error) {
		const errorMessage = `getServices error: ${error instanceof Error ? error.message : String(error)}`
		logger.warn(errorMessage.slice(0, 2000))
		return []
	}
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
	const services = await getServices()
	const service = services.find((service) => service.slug === slug)
	return service || undefined
}
