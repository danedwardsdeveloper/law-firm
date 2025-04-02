import { getArticles } from '@/library/cms/wordpress'
import ArticleCard from './ArticleCard'

export default async function ArticlesPage() {
	const allArticles = await getArticles()

	return (
		<>
			<h1>Articles</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{allArticles.map((article, index) => (
					<ArticleCard key={article.slug} article={article} priority={index < 2} />
				))}
			</div>
		</>
	)
}
