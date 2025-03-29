import type { Article } from '@/library/cms/getArticles'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticleCard({ article, priority }: { article: Article; priority: boolean }) {
	return (
		<Link href={`/articles/${article.slug}`}>
			<h2 className="text-xl font-medium">{article.title}</h2>
			<p className="mb-2">{article.categories[0]}</p>
			{article.featuredImage && <Image src={article.featuredImage} alt={article.excerpt} width={1200} height={630} priority={priority} />}
		</Link>
	)
}
