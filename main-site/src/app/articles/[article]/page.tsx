import LevelThreeLayout from '@/components/LevelThreeLayout'
import { getArticleBySlug, getArticles } from '@/library/cms/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ArticleNotFound from './ArticleNotFound'
import TimeStamps from './TimeStamps'

type ResolvedParams = { article: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const articleSlug = (await params).article
	if (articleSlug === 'not-found') {
		return {
			title: 'Article not found',
			description: "Sorry, we couldn't find the article you're looking for.",
		}
	}
	const article = await getArticleBySlug(articleSlug)
	if (!article) notFound()

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
	const allArticles = await getArticles()
	return [
		...allArticles.map((article) => ({
			article: article.slug,
		})),
		{ article: 'not-found' },
	]
}

export default async function ArticlePage({ params }: { params: Params }) {
	const articleSlug = (await params).article
	if (articleSlug === 'not-found') return <ArticleNotFound />

	const article = await getArticleBySlug(articleSlug)
	if (!article) return notFound()

	const {
		title,
		excerpt,
		featuredImagePlaceholder,
		content,
		createdAt,
		updatedAt,
		featuredImage: { url },
	} = article

	return (
		<LevelThreeLayout
			title={title}
			breadCrumbTrail={[{ display: 'Articles', href: '/articles' }]}
			intro={[excerpt]}
			content={
				<>
					<Image
						src={url}
						alt={excerpt}
						width={1200}
						height={630}
						priority
						placeholder="blur"
						blurDataURL={featuredImagePlaceholder}
						className="w-full max-w-xl rounded-md mb-12"
						sizes="(max-width: 639px) min(calc(100vw - 1rem), 36rem), 
       min(calc(100vw - 1.5rem), 36rem)"
					/>
					<RichText data={content} className="leading-8 text-zinc-700 max-w-prose text-lg rich-text" />
					<TimeStamps createdAt={new Date(createdAt)} updatedAt={new Date(updatedAt)} />
				</>
			}
		/>
	)
}
