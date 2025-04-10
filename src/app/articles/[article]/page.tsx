import BreadCrumbs from '@/components/BreadCrumbs'
import { getPayloadArticleBySlug, getPayloadArticles } from '@/library/cms/payload/getArticles'
import { formatDate } from '@/library/utilities/browser'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { differenceInDays } from 'date-fns'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { article: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const resolvedParams = await params
	const articleSlug = resolvedParams.article
	const article = await getPayloadArticleBySlug(articleSlug)

	if (!article) throw new Error('Article not found')

	const {
		metatitle,
		metadescription,
		slug,
		featuredImage: { alt, filename },
	} = article

	return {
		title: metatitle,
		description: metadescription,
		openGraph: {
			images: [
				{
					url: `/images/payload/articles/featured/${filename}`,
					width: 1200,
					height: 630,
					alt: alt,
				},
			],
		},
		alternates: {
			canonical: `/articles/${slug}`,
		},
		robots: {
			follow: true,
			index: true,
		},
	}
}

export async function generateStaticParams(): StaticParams {
	const allArticles = await getPayloadArticles()
	return allArticles.map((article) => ({
		article: article.slug,
	}))
}

export default async function ArticlePage({ params }: { params: Params }) {
	const articleSlug = (await params).article
	const article = await getPayloadArticleBySlug(articleSlug)

	if (!article) notFound()

	const {
		title,
		excerpt,
		featuredImagePlaceholder,
		content,
		createdAt,
		updatedAt,
		featuredImage: { url },
	} = article

	const createdAtDate = new Date(createdAt)
	const updatedAtDate = new Date(updatedAt)
	const hasBeenUpdated = differenceInDays(updatedAtDate, createdAtDate) > 0

	return (
		<>
			<BreadCrumbs trail={[{ display: 'Articles', href: '/articles' }]} current={title} />
			<main id="main-content">
				<h1 className="text-4xl font-semibold mb-12 text-balance">{title}</h1>
				<p className="mb-12 max-w-2xl text-balance text-lg">{excerpt}</p>
				{url && (
					<Image
						src={url}
						alt={excerpt}
						width={1200}
						height={630}
						priority
						sizes="421" // ToDo!
						placeholder="blur"
						blurDataURL={featuredImagePlaceholder}
						className="w-full max-w-xl rounded-md mb-12"
					/>
				)}
				<RichText data={content} className="leading-8 text-zinc-700 max-w-prose text-lg rich-text" />
				{/* This could be a separate component Timestamps */}
				<div className="text-zinc-700 max-w-prose text-md">
					<p>
						{hasBeenUpdated && <span>Published </span>}
						<time>{formatDate(createdAtDate)}</time>
					</p>
					{hasBeenUpdated && (
						<p>
							<span>Updated </span>
							<time>{formatDate(updatedAtDate)}</time>
						</p>
					)}
				</div>
			</main>
		</>
	)
}
