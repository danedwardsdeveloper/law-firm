import type { Testimonial } from '@/types/definitions/testimonial'
import Image from 'next/image'

export default function Testimonials({ testimonials, priorityIndices = [] }: { testimonials: Testimonial[]; priorityIndices?: number[] }) {
	return (
		<ul className="grid grid-rows-1 md:grid-rows-2 md:gap-x-8 gap-y-12">
			{testimonials.map((testimonial, index) => (
				<li key={`${testimonial.writer.name}-${index}`} className="flex flex-col md:flex-row gap-x-4">
					<Image
						src={testimonial.photo}
						alt={testimonial.altText}
						className="max-w-60 rounded-md"
						priority={priorityIndices.includes(index)}
						sizes="240px"
						placeholder="blur"
					/>
					<div>
						<div className="mb-4">
							<h3 className="text-xl font-medium">{testimonial.service}</h3>
							<span>
								{testimonial.writer.name}
								{', '}
								{testimonial.writer.role}
								{', '}
								{testimonial.company && testimonial.company}
							</span>
						</div>
						{testimonial.content.map((paragraph) => (
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
