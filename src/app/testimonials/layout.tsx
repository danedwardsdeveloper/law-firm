import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Testimonials', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		'Testimonials for Archer Finch Law, a London intellectual property law firm specialising in copyright infringement and trademark protection.',
	alternates: {
		canonical: '/testimonials',
	},
}

export default function TestimonialsLayout({ children }: { children: ReactNode }) {
	return <div className="max-w-4xl w-full mx-auto px-4 lg:px-0">{children}</div>
}
