import type { Testimonial } from '@/types/definitions/testimonial'
import Image from 'next/image'

export default function Testimonials({ testimonials, priorityIndices = [] }: { testimonials: Testimonial[]; priorityIndices?: number[] }) {
	return (
		<ul className="grid grid-rows-1 md:grid-rows-2 md:gap-x-8 gap-y-12">
			{testimonials.map(({ writer, photo, altText, service, company, content }, index) => (
				<li key={`${writer.name}-${index}`} className="flex flex-col md:flex-row gap-x-4">
					<Image
						src={photo}
						alt={altText}
						className="max-w-60 rounded-md"
						priority={priorityIndices.includes(index)}
						sizes="240px"
						placeholder="blur"
					/>
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
						{content.map((paragraph) => (
							<p key={paragraph} className="mb-4">
								{paragraph}
							</p>
						))}
					</div>
				</li>
			))}
		</ul>
	)
}
