import LevelTwoLayout from '@/components/LevelTwoLayout'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { testimonials } from './data'

export const metadata: Metadata = {
	title: optimiseTitle({
		base: 'Testimonials',
		additionalPhraseOptions: titleMetadataPhrases,
	}),
	description:
		'Testimonials for Archer Finch Law, a London intellectual property law firm specialising in copyright infringement and trademark protection.',
	alternates: {
		canonical: '/testimonials',
	},
}

export default function TestimonialsPage() {
	return (
		<LevelTwoLayout
			title="Testimonials"
			intro={[
				"Our clients' experiences speak volumes about our commitment to protecting your intellectual property.",
				'From trademark defense to patent applications, we translate complex legal challenges into clear, effective solutions.',
			]}
			grid={false}
			content={
				<ul className="flex flex-col gap-y-24 md:gap-y-32">
					{testimonials.map(({ writer: { role, name }, anchor, company, service, photo, altText, content }, mapIndex) => (
						<li key={name} id={anchor} className="w-full flex flex-col md:flex-row md:gap-x-4 max-w-2xl">
							<Image
								src={photo}
								alt={altText}
								priority={mapIndex < 2}
								sizes="240px"
								placeholder="blur"
								className="md:w-auto rounded-md md:max-h-72 mb-2 md:mb-0"
								// ToDo: Sizes prop
							/>
							<div className="w-full ">
								<h3 className="text-xl font-semibold text-balance mb-1">
									{`${name}, ${role}`}
									{company && `, ${company}`}
								</h3>
								<p className="mb-6">{service}</p>
								{content.map((paragraph) => (
									<p key={paragraph} className="mb-3">
										{paragraph}
									</p>
								))}
							</div>
						</li>
					))}
				</ul>
			}
		/>
	)
}
