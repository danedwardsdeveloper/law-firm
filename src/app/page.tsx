import { getTeamMembers } from '@/library/cms/getTeamMembers'
import TeamMemberCard from './team/TeamMemberCard'

export default async function HomePage() {
	const allTeamMembers = await getTeamMembers()
	const partners = [allTeamMembers[0], allTeamMembers[1]]

	return (
		<>
			<section className="mb-20">
				<h1>Home</h1>
			</section>
			<section className="">
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
