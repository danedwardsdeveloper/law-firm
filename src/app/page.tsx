import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import Testimonials from '@/components/Testimonials'
import { getPayloadArticles } from '@/library/cms/payload/getArticles'
import { getServices } from '@/library/cms/payload/getServices'
import { getTeamMembers } from '@/library/cms/wordpress/getTeamMembers'
import ArticleCard from './articles/ArticleCard'
import TeamMemberCard from './team/TeamMemberCard'
import { testimonials } from './testimonials/data'

export default async function HomePage() {
	const allTeamMembers = await getTeamMembers()
	const allServices = await getServices()
	const allArticles = await getPayloadArticles()

	return (
		<main id="main-content">
			<section className="md:mt-20 mb-40 max-w-4xl w-full mx-auto mt-12 px-4 lg:px-0">
				<Hero />
			</section>

			<div className="bg-cream-100">
				<section className="max-w-4xl w-full mx-auto px-4 lg:px-0 py-20">
					<h2 className="text-4xl font-bold mb-8">Services</h2>
					<p className="mb-12">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
						{allServices.slice(0, 2).map((service, index) => (
							<ServiceCard key={service.id} service={service} priority={index < 2} />
						))}
					</div>
				</section>
			</div>

			<section className="mb-20 max-w-4xl w-full mx-auto py-20 px-4 lg:px-0">
				<h2 className="text-4xl font-bold mb-12">Testimonials</h2>
				<p className="mb-10">What people have to say about our award-winning IP law firm</p>
				<Testimonials testimonials={testimonials.slice(0, 2)} />
			</section>

			<div className="bg-cream-100">
				<section className="mb-20 max-w-4xl w-full mx-auto py-20 px-4 lg:px-0">
					<h2 className="text-4xl font-bold mb-12">Articles</h2>
					<p className="mb-10">Latest articles about intellectual property</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
						{allArticles.slice(0, 2).map((article) => (
							<ArticleCard key={article.slug} article={article} priority={false} />
						))}
					</div>
				</section>
			</div>

			<section className="mb-20 max-w-4xl w-full mx-auto px-4 lg:px-0 py-20">
				<h2 className="text-2xl font-medium mb-4">Team</h2>
				<p className="mb-12">Learn more about our team</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
					{allTeamMembers.slice(0, 2).map((teamMember, index) => (
						<TeamMemberCard key={teamMember.slug} teamMember={teamMember} priority={index < 2} />
					))}
				</div>
			</section>
		</main>
	)
}
