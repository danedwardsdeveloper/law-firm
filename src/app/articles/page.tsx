import BreadCrumbs from '@/components/BreadCrumbs'
import { getPayloadArticles } from '@/library/cms/payload/getArticles'
import ArticleCard from './ArticleCard'

export default async function ArticlesPage() {
	const allArticles = await getPayloadArticles()

	return (
		<>
			<BreadCrumbs current="Articles" />
			<main id="main-content">
				<h1 className="text-4xl font-bold mb-8 text-zinc-900">Articles</h1>
				<p className="mb-16 max-w-2xl text-lg text-pretty">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
					enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
					{allArticles.map((article, index) => (
						<ArticleCard key={article.slug} article={article} priority={index < 2} />
					))}
				</div>
			</main>
		</>
	)
}
