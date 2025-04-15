import NotFound from '@/components/notFound'
import { getArticles } from '@/library/cms/payload'
import ArticleCard from '../ArticleCard'

export default async function ArticleNotFound() {
	const allArticles = await getArticles()

	return (
		<NotFound
			contentType="article"
			suggestedContentTitle="Were you looking for any of these articles?"
			suggestedContent={allArticles.map((article, index) => <ArticleCard key={article.slug} article={article} priority={index < 2} />)}
		/>
	)
}
