import type { Service } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ServiceCard({
	service: { serviceType, slug, featuredImage },
	priority = false,
}: { service: Service; priority?: boolean }) {
	return (
		<li>
			<Link href={`/services/${slug}`} className="flex flex-col gap-y-2 hover:opacity-80 transition-opacity duration-300">
				<h2 className="text-2xl font-medium">{serviceType}</h2>
				<Image src={featuredImage.url} alt="" height={1920} width={1281} priority={priority} className="w-full max-w-md" />
			</Link>
		</li>
	)
}
