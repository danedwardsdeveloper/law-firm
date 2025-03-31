import Testimonials from '@/components/Testimonials'
import { testimonials } from './data'

export default function TestimonialsPage() {
	return (
		<>
			<header className="mb-20">
				<h1>Testimonials</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
					enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</header>
			<section className="mb-20">
				<Testimonials testimonials={testimonials} priorityIndices={[0]} />
			</section>
		</>
	)
}
