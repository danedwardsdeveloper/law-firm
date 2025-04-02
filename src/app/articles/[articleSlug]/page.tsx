import { getArticleBySlug, getArticles } from '@/library/cms/wordpress'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { articleSlug: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const resolvedParams = await params
	const articleSlug = resolvedParams.articleSlug
	const article = await getArticleBySlug(articleSlug)

	if (!article) throw new Error('Article not found')

	// Lots of ToDos here
	return {
		title: `${article.title} | Archer Finch Legal`,
		description: article.excerpt,
		openGraph: {
			images: [article.featuredImage || '/todo/image'],
		},
		alternates: {
			canonical: `/articles/${article.slug}`,
		},
	}
}

export async function generateStaticParams(): StaticParams {
	const allArticles = await getArticles()
	return allArticles.map((article) => ({
		articleSlug: article.slug,
	}))
}

export default async function ArticlePage({ params }: { params: Params }) {
	const articleSlug = (await params).articleSlug
	const article = await getArticleBySlug(articleSlug)

	if (!article) notFound()

	return (
		<div className="flex flex-col gap-y-4">
			<p className="font-medium">{article.categories[0]}</p>
			<h1>{article.title}</h1>
			{article.featuredImage && (
				<Image
					src={article.featuredImage}
					alt={article.excerpt}
					width={1200}
					height={630}
					priority
					sizes="421"
					className="max-w-xl rounded-md mb-12"
				/>
			)}
			<div
				className="flex flex-col gap-y-4 leading-7 text-zinc-700 max-w-prose text-lg"
				// biome-ignore lint/security/noDangerouslySetInnerHtml:
				dangerouslySetInnerHTML={{ __html: article.content }}
			/>
		</div>
	)
}
