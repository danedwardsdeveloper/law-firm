import { CheckCircleIcon } from '@heroicons/react/24/outline'
import CTA from './CTA'

export default function Hero() {
	const bullets = [
		'Experienced IP lawyers',
		'Straightforward advice in plain English',
		'Fixed-fee services available',
		'Serving London businesses since 2015',
	]
	return (
		<>
			<div className="flex flex-col md:flex-row md:justify-between mb-12 md:mb-0">
				<div className="mb-12">
					<span className="block mb-4">Protect your intellectual property</span>
					<h1 className="text-3xl font-semibold mb-12">Secure your most valuable assets</h1>
					<ul className="flex flex-col gap-y-3">
						{bullets.map((bullet) => (
							<li key={bullet} className="flex">
								<CheckCircleIcon className="size-6 text-green-600" />
								<span className="ml-2">{bullet}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="w-full aspect-square md:max-w-72 bg-purple-300 rounded-md" />
			</div>
			<div className="flex justify-center md:justify-start">
				<CTA classes="max-w-xs w-full" />
			</div>
		</>
	)
}
