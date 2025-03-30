import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'About', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		'Archer Finch Law is a London intellectual property law firm specialising in copyright infringement, patent applications, and trademark protection.',
	alternates: {
		canonical: '/about',
	},
}

export default function AboutLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
