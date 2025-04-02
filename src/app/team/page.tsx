import { getTeamMembers } from '@/library/cms/wordpress'
import type { Metadata } from 'next'
import TeamMemberCard from './TeamMemberCard'

export const metadata: Metadata = {
	title: 'Team members | Archer Finch Legal, intellectual property lawyers',
	description:
		'Expert intellectual property lawyers at Archer Finch Legal. Meet our dedicated team of IP specialists committed to protecting your creative assets.',
	alternates: {
		canonical: '/team',
	},
}

export default async function TeamPage() {
	const teamMembersData = await getTeamMembers()

	return (
		<>
			<h1>Team</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
				{teamMembersData.map((teamMember, index) => (
					<TeamMemberCard key={teamMember.slug} teamMember={teamMember} priority={index < 2} />
				))}
			</div>
		</>
	)
}
