import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import CTA from '../CtaButton'
import heroImage from './hero-image.png'

export default function Hero() {
	const bullets = [
		'Patent, trademark and copyright specialists',
		'Straightforward advice in plain English',
		'London office, global service',
	]

	return (
		<>
			<div className="flex flex-col md:flex-row md:justify-between md:gap-x-12 lg:gap-x-4">
				<div className="mb-8 md:mb-0 xl:flex xl:flex-col xl:justify-between">
					<div>
						<span className="block mb-4 text-xl font-medium text-balance">London intellectual property lawyers</span>
						<h1 className="text-3xl lg:text-5xl font-bold mb-8 text-balance">Secure your most valuable assets</h1>
					</div>
					<div>
						<ul className="flex flex-col gap-y-3 mb-8">
							{bullets.map((bullet) => (
								<li key={bullet} className="flex">
									<CheckCircleIcon className="size-6 text-green-600 shrink-0" />
									<span className="ml-2">{bullet}</span>
								</li>
							))}
						</ul>
						<div className="flex justify-center md:justify-start">
							<CTA classes="max-w-xs w-full" />
						</div>
					</div>
				</div>
				<div className="w-full max-w-full sm:max-w-64 md:max-w-96 mx-auto">
					<Image
						src={heroImage}
						alt="A smiling young architect with glasses holding rolled blueprints against his chest in a bright office environment."
						placeholder="blur"
						className="rounded-md"
					/>
				</div>
			</div>
		</>
	)
}
