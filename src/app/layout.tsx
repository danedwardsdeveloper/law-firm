import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import Menu from '@/components/Menu'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import socialImage from '../../public/images/archer-finch-legal.png'

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-plus-jakarta-sans',
})

const metatitle = 'Archer Finch Legal | Intellectual property lawyers, London'

const metadescription =
	'Archer Finch Legal provides expert intellectual property services in London, offering practical advice on trademarks, copyright, patents and IP litigation.'

if (!socialImage) {
	throw new Error('Layout.tsx: social image missing')
}

export const metadata: Metadata = {
	title: metatitle,
	metadataBase: new URL(dynamicBaseURL),
	description: metadescription,
	openGraph: {
		images: [
			{
				url: '/images/archer-finch-legal.png',
				height: 630,
				width: 1200,
				alt: metatitle,
			},
		],
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
