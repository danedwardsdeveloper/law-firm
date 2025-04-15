import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { ReactNode } from 'react'
import CompanyLogo from '../CompanyLogo'
import { BackButton, MissingPageTitle } from './ClientComponents'

function StoryBrand() {
	return (
		<div className="flex items-center justify-center border-t border-zinc-200 py-8 mb-12">
			<div className="mr-4">
				<CompanyLogo size="size-10" />
			</div>
			<div className="text-lg">
				<p className="font-bold">Archer Finch Legal</p>
				<p>Intellectual property lawyers, London</p>
			</div>
		</div>
	)
}

function ContentContainer({ useGrid, children }: { useGrid: boolean; children: ReactNode }) {
	if (useGrid) {
		return (
			<div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 mt-4 sm:mt-8 mb-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">{children}</div>
			</div>
		)
	}

	return children
}

interface Props {
	contentType?: 'team member' | 'article' | 'service'
	showStoryBrand?: boolean
	suggestedContentTitle?: string
	useGrid?: boolean
	suggestedContent: ReactNode
}

export default function NotFound({ contentType, showStoryBrand = true, suggestedContent, suggestedContentTitle, useGrid = true }: Props) {
	return (
		<main id="main-content">
			<div className="max-w-4xl mx-auto px-4 pt-12 md:pt-20 mb-12">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold mb-4">Page not found</h1>
					<p className="text-lg mb-6">
						{"Sorry, we couldn't find "}
						{contentType && `the ${contentType} `}
						<MissingPageTitle />
						<br />
						{'We may have moved or deleted it'}
					</p>
					<div className="flex justify-center gap-x-4">
						<BackButton styles="inline-block bg-green-600 hover:bg-green-500 active:bg-green-400 sm:active:bg-green-500 text-white hover:shadow-md active:shadow-md  transition-all duration-300 px-6 py-1 rounded-lg font-bold text-xl" />
						<Link
							href="/"
							className="inline-block  bg-green-600 hover:bg-green-500 active:bg-green-400 sm:active:bg-green-500 text-white hover:shadow-md active:shadow-md  transition-all duration-300 px-6 py-1 rounded-lg font-bold text-xl"
						>
							<div className="flex items-center gap-x-2">
								<HomeIcon className="size-6" />
								Home
							</div>
						</Link>
					</div>
				</div>
				{showStoryBrand && <StoryBrand />}
			</div>

			<div>
				<h2 className="text-2xl lg:text-3xl font-bold mb-16 text-balance text-center">{suggestedContentTitle}</h2>
				<ContentContainer useGrid={useGrid}>{suggestedContent}</ContentContainer>
			</div>
		</main>
	)
}
