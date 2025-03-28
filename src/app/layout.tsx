import Providers from '@/components/Providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'
import Menu from '@/components/Menu'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Archer Finch Legal',
	metadataBase: new URL(dynamicBaseURL),
	description: 'Site description',
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
		<html lang="en-GB" suppressHydrationWarning>
			<body className="flex flex-col w-full min-h-screen">
				<Providers>
					<Menu />
					<div className="max-w-4xl w-full mx-auto mt-12">{children}</div>
				</Providers>
			</body>
		</html>
	)
}
