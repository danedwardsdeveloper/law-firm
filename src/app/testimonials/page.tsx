import LevelTwoPageLayout from '@/components/LevelTwoPageLayout'
import { TestimonialCard } from '@/components/TestimonialCard'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import { testimonials } from './data'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Testimonials', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		'Testimonials for Archer Finch Law, a London intellectual property law firm specialising in copyright infringement and trademark protection.',
	alternates: {
		canonical: '/testimonials',
	},
}

export default function TestimonialsPage() {
	return (
		<LevelTwoPageLayout
			title="Testimonials"
			intro={[
				"Our clients' experiences speak volumes about our commitment to protecting your intellectual property.",
				'From trademark defense to patent applications, we translate complex legal challenges into clear, effective solutions.',
			]}
			content={testimonials.map((testimonial, mapIndex) => (
				<TestimonialCard key={testimonial.index} testimonial={testimonial} priority={mapIndex < 2} />
			))}
		/>
	)
}
