import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import Menu from '@/components/Menu'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-plus-jakarta-sans',
})

export const metadata: Metadata = {
	title: 'Archer Finch Legal',
	metadataBase: new URL(dynamicBaseURL),
	description: 'Site description',
	openGraph: {
		images: ['/images/papers.png'],
	},
	alternates: {
		canonical: dynamicBaseURL,
	},
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning className={plusJakartaSans.className}>
			<body className="flex flex-col w-full min-h-screen bg-amber-50">
				<Menu />
				<div className="max-w-4xl w-full mx-auto mt-12 mb-20 px-4 lg:px-0">{children}</div>
			</body>
		</html>
	)
}
