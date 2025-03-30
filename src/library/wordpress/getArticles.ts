import urlJoin from 'proper-url-join'
import { wordpressRestApi } from '../environment/publicVariables'
import logger from '../logger'

export type Article = {
	id: string
	title: string
	slug: string
	excerpt: string
	content: string
	date: string
	featuredImage?: string
	categories: number[]
}

let articlesCache: Article[] | null = null

export async function getArticles(): Promise<Article[]> {
	if (articlesCache) return articlesCache

	try {
		const postsResponse = await fetch(urlJoin(wordpressRestApi, 'posts'), {
			headers: { 'Content-Type': 'application/json' },
		})

		if (!postsResponse.ok) throw new Error(`Posts response not ok: ${postsResponse.status}`)

		const postsData = await postsResponse.json()

		// biome-ignore lint/suspicious/noExplicitAny:
		const articlesWithoutImages: Article[] = postsData.map((item: any) => ({
			id: item.id.toString(),
			title: item.title.rendered,
			slug: item.slug,
			excerpt: item.excerpt.rendered,
			content: item.content.rendered,
			date: item.date,
			featuredImage: undefined,
			categories: item.categories,
		}))

		const articlesData = await Promise.all(
			// biome-ignore lint/suspicious/noExplicitAny:
			postsData.map(async (post: any, index: number) => {
				const article = articlesWithoutImages[index]

				if (!post.featured_media) return article

				try {
					const mediaResponse = await fetch(urlJoin(wordpressRestApi, 'media', post.featured_media), {
						headers: { 'Content-Type': 'application/json' },
					})

					if (!mediaResponse.ok) return article

					const mediaData = await mediaResponse.json()

					return {
						...article,
						featuredImage: mediaData.source_url,
					}
				} catch (error) {
					logger.error(`Error fetching media for post ${post.id}:`, error)
					return article
				}
			}),
		)

		articlesCache = articlesData
		return articlesData
	} catch (error) {
		logger.error('getArticles error: ', error)
		return []
	}
}

export async function getArticleBySlug(slug: string) {
	const allArticles = await getArticles()
	return allArticles.find((article) => article.slug === slug)
}
