import type { ReactNode } from 'react'
import BreadCrumbs, { type BreadCrumbTrail } from './BreadCrumbs'
import CtaSection from './CtaSection'

export default function LevelThreePageLayout({
	title,
	breadCrumbTrail,
	intro,
	content,
}: {
	title: string
	breadCrumbTrail: BreadCrumbTrail
	intro: string[]
	content: ReactNode
}) {
	return (
		<>
			<div className="max-w-4xl w-full mx-auto px-4 lg:px-0 mt-4 sm:mt-8 mb-20">
				<BreadCrumbs trail={breadCrumbTrail} current={title} />
				<main id="main-content">
					<header className="flex flex-col max-w-2xl">
						<h1 className="text-4xl font-bold mb-12 text-zinc-900 text-balance">{title}</h1>
						<div className="max-w-2xl text-lg text-balance gap-y-4 mb-12">
							{intro.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</header>
					{content}
				</main>
			</div>
			<CtaSection />
		</>
	)
}
