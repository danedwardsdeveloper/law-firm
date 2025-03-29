import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Articles',
}

export default function ArticlesLayout({ children }: { children: ReactNode }) {
	return <div className="mx-4 sm:mx-12 lg:mx-0">{children}</div>
}
