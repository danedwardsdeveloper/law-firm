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
				// ToDo: placeholder handling
				// placeholder="blur"
				className="w-full max-w-md mb-2"
			/>
			<h2 className="text-2xl font-medium mb-1">{serviceType}</h2>
			<p>{tagline}</p>
		</Link>
	)
}
