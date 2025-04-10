import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Services', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		'We offer legal services such as copyright enforcement, patent applications, licensing agreements, IP due diligence, and strategic trademark protection.',
	alternates: {
		canonical: '/services',
	},
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
	return <div className="max-w-4xl w-full mx-auto px-4 lg:px-0">{children}</div>
}
