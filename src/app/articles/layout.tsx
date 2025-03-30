import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Articles', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		"Expert insights on intellectual property law from Archer Finch - articles covering copyright, patents, and trademarks from London's leading IP solicitors.",
	alternates: {
		canonical: '/articles',
	},
}

export default function ArticlesLayout({ children }: { children: ReactNode }) {
	return <div className="">{children}</div>
}
