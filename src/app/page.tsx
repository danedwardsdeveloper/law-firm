import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import { getTeamMembers } from '@/library/wordpress/getTeamMembers'
import TeamMemberCard from './team/TeamMemberCard'
import { testimonials } from './testimonials/data'

export default async function HomePage() {
	const allTeamMembers = await getTeamMembers()
	const partners = [allTeamMembers[0], allTeamMembers[1]]

	return (
		<>
			<section className="md:mt-20 mb-40">
				<Hero />
			</section>
			<section className="mb-20">
				<h2 className="text-xl font-medium mb-4">Testimonials</h2>
				<p className="mb-10">What people have to say about our award-winning IP law firm</p>
				<Testimonials testimonials={testimonials.slice(0, 2)} />
			</section>
			<section className="mb-20">
				<h2 className="text-2xl font-medium mb-4">Team</h2>
				<p className="mb-12">Learn more about our team</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
					{partners.map((teamMember, index) => (
						<TeamMemberCard key={teamMember.slug} teamMember={teamMember} priority={index < 2} />
					))}
				</div>
			</section>
		</>
	)
}
