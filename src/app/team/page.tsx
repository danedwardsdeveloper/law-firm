import { getTeamMembers } from '@/library/cms/getTeamMembers'
import type { Metadata } from 'next'
import { Fragment } from 'react'
import PersonCard from './PersonCard'

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
			<div className="grid grid-cols-2 gap-8">
				{teamMembersData.map((teamMember, index) => (
					<Fragment key={teamMember.slug}>
						<PersonCard teamMember={teamMember} priority={index < 2} />
						<p>{teamMember.featuredImage}</p>
					</Fragment>
				))}
			</div>
		</>
	)
}
