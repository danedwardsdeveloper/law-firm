import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import ContactForm from '@/components/ContactForm'
import Menu from '@/components/Menu'
import Provider from '@/components/Provider'
import { mergeClasses } from '@/library/utilities/browser'
import { Plus_Jakarta_Sans } from 'next/font/google'
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
		<html lang="en-GB" suppressHydrationWarning className={mergeClasses(plusJakartaSans.className, 'text-zinc-900')}>
			<body className="flex flex-col w-full min-h-screen bg-amber-50">
				<Provider>
					<Menu />
					<ContactForm />
					<div className="max-w-4xl w-full mx-auto mt-12 mb-20 px-4 lg:px-0">{children}</div>
				</Provider>
				<Script src="https://scripts.simpleanalyticscdn.com/latest.js" strategy="lazyOnload" />
			</body>
		</html>
	)
}
