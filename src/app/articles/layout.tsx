import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Articles',
}

export default function ArticlesLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
