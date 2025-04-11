import type { Testimonial } from '@/types/definitions/testimonial'
import Image from 'next/image'

export function TestimonialCard({
	testimonial: { writer, photo, altText, service, company, content },
	priority,
}: { testimonial: Testimonial; priority: boolean }) {
	return (
		<div className="flex flex-col md:flex-row gap-x-4">
			<Image src={photo} alt={altText} className="w-auto max-h-72 rounded-md" priority={priority} sizes="240px" placeholder="blur" />
			<div>
				<div className="mb-4">
					<h3 className="text-xl font-medium">{service}</h3>
					<span>
						{writer.name}
						{', '}
						{writer.role}
						{', '}
						{company && company}
					</span>
				</div>
				{content.slice(0, 1).map((paragraph) => (
					<p key={paragraph} className="mb-4">
						{paragraph}
					</p>
				))}
			</div>
		</div>
	)
}
