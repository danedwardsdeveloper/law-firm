import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import Menu from '@/components/Menu'
import Provider from '@/components/Provider'
import ContactFormModal from '@/components/contactFormModal'
import Footer from '@/components/footer'
import { mergeClasses } from '@/library/utilities/browser'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'
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
	robots: {
		index: true,
		follow: true,
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
		<html lang="en-GB" suppressHydrationWarning className={mergeClasses(plusJakartaSans.className, 'text-zinc-900 text-base')}>
			<body className="flex flex-col w-full min-h-screen bg-cream-50">
				<Provider>
					<Link
						href="#main-content"
						className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:outline focus:outline-2 focus:text-xl focus:underline-offset-2 focus:underline focus:rounded-md focus:bg-cream-50 focus:border-cream-100"
					>
						Skip to main content
					</Link>
					<Menu />
					<ContactFormModal />
					<div
						className={mergeClasses(
							'mt-16', // Offset fixed mobile menu
							'mb-20',
						)}
					>
						{children}
					</div>
					<Footer />
				</Provider>
				<Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="lazyOnload" />
			</body>
		</html>
	)
}
