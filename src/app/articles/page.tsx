import LevelTwoLayout from '@/components/LevelTwoLayout'
import { getArticles } from '@/library/cms/payload'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import ArticleCard from './ArticleCard'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Articles', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		"Expert insights on intellectual property law from Archer Finch - articles covering copyright, patents, and trademarks from London's leading IP solicitors.",
	alternates: {
		canonical: '/articles',
	},
}

export default async function ArticlesPage() {
	const allArticles = await getArticles()

	return (
		<LevelTwoLayout
			title="Articles"
			intro={[
				'Stay informed on the evolving landscape of intellectual property law with insights from our expert team.',
				'Our articles provide practical guidance on protecting your creative and business assets, emerging legal challenges, and strategic approaches to IP that can give you a competitive advantage.',
			]}
			content={allArticles.map((article, index) => <ArticleCard key={article.slug} article={article} priority={index < 2} />)}
		/>
	)
}
