import type { ReactNode } from 'react'
import BreadCrumbs from './BreadCrumbs'

export default function LevelTwoPageLayout({
	title,
	intro,
	content,
}: {
	title: string
	intro: string[]
	content: ReactNode
}) {
	return (
		<div className="max-w-4xl w-full mx-auto px-4 lg:px-0">
			<BreadCrumbs current={title} />
			<main id="main-content">
				<h1 className="text-4xl font-bold mb-8 text-zinc-900">{title}</h1>
				<div className="max-w-2xl text-lg text-pretty flex flex-col gap-y-4 mb-16">
					{intro.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">{content}</div>
			</main>
		</div>
	)
}
