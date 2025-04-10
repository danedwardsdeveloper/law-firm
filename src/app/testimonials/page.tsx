import BreadCrumbs from '@/components/BreadCrumbs'
import Testimonials from '@/components/Testimonials'
import { testimonials } from './data'

export default function TestimonialsPage() {
	return (
		<>
			<BreadCrumbs current="Testimonials" />
			<main id="main-content">
				<div className="mb-20">
					<h1 className="text-4xl font-bold mb-12 text-zinc-900">Testimonials</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
				<Testimonials testimonials={testimonials} priorityIndices={[0]} />
			</main>
		</>
	)
}
