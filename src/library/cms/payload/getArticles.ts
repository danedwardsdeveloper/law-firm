import fs from 'node:fs'
import path from 'node:path'
import { payloadCmsBase } from '@/library/environment/publicVariables'
import { payloadCmsSecret } from '@/library/environment/serverVariables'
import logger from '@/library/logger'
import { downloadImage } from '@/library/utilities/server'
import type { PayloadArticle } from '@/types'
import { getPlaiceholder } from 'plaiceholder'
import urlJoin from 'proper-url-join'
import { sortArticles } from './sortArticles'

let articlesCache: PayloadArticle[] | undefined = undefined

export async function getArticles(): Promise<PayloadArticle[]> {
	if (articlesCache) return articlesCache

	try {
		const cacheBust = `?t=${Date.now()}`
		const response = await fetch(urlJoin(payloadCmsBase, 'api/articles', cacheBust, '&limit=100'), {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${payloadCmsSecret}`,
			},
		})

		if (!response.ok) {
			logger.warn('Fetch articles response not okay. Is the Payload server running?')
			return []
		}

		const data = await response.json()

		const processedArticles: PayloadArticle[] = []

		for (const document of data.docs) {
			try {
				const imageFileName = document.featuredImage.url.split('/').pop()

				const payloadFolder = '/images/payload'
				const subFolder = 'articles/featured'

				await downloadImage({
					imageFileName,
					subFolder,
					cms: 'payload',
				})

				const downloadedFilePath = path.join(process.cwd(), 'public', payloadFolder, subFolder, imageFileName)
				const downloadedFile = fs.readFileSync(downloadedFilePath)

				const { base64 } = await getPlaiceholder(downloadedFile)

				const processedArticle: PayloadArticle = {
					...document,
					featuredImagePlaceholder: base64,
					featuredImage: {
						alt: document.featuredImage.alt,
						url: urlJoin(payloadFolder, subFolder, imageFileName, {
							leadingSlash: true,
						}),
					},
				}

				processedArticles.push(processedArticle)
			} catch (error) {
				logger.error(`Error processing article "${document.serviceType || 'unknown'}":`, error)
			}
		}

		if (processedArticles.length === 0) {
			logger.warn('No valid articles found')
			return []
		}

		const sortedArticles = sortArticles(processedArticles)

		articlesCache = sortedArticles

		return articlesCache
	} catch (error) {
		const errorMessage = `getArticles error: ${error instanceof Error ? error.message : String(error)}`
		logger.warn(errorMessage)
		return []
	}
}

export async function getArticleBySlug(slug: string): Promise<PayloadArticle | undefined> {
	const articles = await getArticles()
	const article = articles.find((article) => article.slug === slug)
	return article || undefined
}
