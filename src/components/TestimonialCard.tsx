import type { Testimonial } from '@/types/definitions/testimonial'
import Image from 'next/image'
import Link from 'next/link'

export function TestimonialCard({
	testimonial: {
		writer: { name, role },
		photo,
		altText,
		service,
		company,
		content,
	},
	priority,
}: { testimonial: Testimonial; priority: boolean }) {
	return (
		<div>
			<Image src={photo} alt={altText} className="w-auto max-h-72 rounded-md mb-2" priority={priority} sizes="240px" placeholder="blur" />
			<h3 className="text-xl font-medium">{service}</h3>
			<p className="mb-3">
				{`${name}, role`}
				{company && `, ${company}`}
			</p>
			<p className="mb-4">
				{content.slice(0, 1)}
				{/* Add anchor links */}
				<Link href="/testimonials" className="text-zinc-600 link ml-2">
					Read more
				</Link>
			</p>
		</div>
	)
}
