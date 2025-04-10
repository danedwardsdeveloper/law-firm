import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Team',
}

export default function TeamLayout({ children }: { children: ReactNode }) {
	return <div className="max-w-4xl w-full mx-auto px-4 lg:px-0">{children}</div>
}
