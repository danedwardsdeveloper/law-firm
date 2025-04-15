import Link from 'next/link'
import CTA from './CtaButton'

export default function CtaSection() {
	return (
		<div className="bg-green-600">
			<div className="mx-auto max-w-4xl px-6 xl:px-0 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between">
				<h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
					Protect your intellectual property
				</h2>
				<div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
					<CTA invertColours />
					<Link href="/articles/about" className="text-sm/6 font-semibold text-white">
						Learn more <span aria-hidden="true">→</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
