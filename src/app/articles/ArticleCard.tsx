import type { PayloadArticle } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticleCard({
	article: {
		slug,
		featuredImagePlaceholder,
		excerpt,
		title,
		featuredImage: { url, alt },
	},
	priority,
}: { article: PayloadArticle; priority: boolean }) {
	return (
		<Link href={`/articles/${slug}`}>
			<Image
				src={url}
				alt={alt}
				width={1200}
				height={630}
				priority={priority}
				placeholder="blur"
				blurDataURL={featuredImagePlaceholder}
				className="rounded-md mb-2 w-full"
			/>
			<h2 className="text-xl font-medium mb-1">{title}</h2>
			<p>{excerpt}</p>
		</Link>
	)
}
