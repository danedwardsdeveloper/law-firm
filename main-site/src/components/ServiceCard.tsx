import type { Service } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ServiceCard({
	service: { serviceType, tagline, slug, featuredImage },
	priority = false,
}: { service: Service; priority?: boolean }) {
	return (
		<Link href={`/services/${slug}`} className="flex flex-col gap-y-2 hover:opacity-80 transition-opacity duration-300">
			<Image
				src={featuredImage.url}
				alt=""
				height={1200}
				width={630}
				priority={priority}
				className="w-full max-w-md mb-2 rounded-md"
				sizes="(max-width: 639px) calc(100vw - 1rem), 
       (min-width: 640px) and (max-width: 767px) calc(100vw - 1.5rem), 
       (min-width: 768px) min(calc((min(100vw, 42rem) - 2rem) / 2), 30.375rem)"
			/>
			<h2 className="text-2xl font-medium mb-1">{serviceType}</h2>
			<p>{tagline}</p>
		</Link>
	)
}
