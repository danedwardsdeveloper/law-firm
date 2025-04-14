import LevelTwoLayout from '@/components/LevelTwoLayout'
import { getTeamMembers } from '@/library/cms/wordpress/getTeamMembers'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import TeamMemberCard from './TeamMemberCard'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Team', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		'Meet the experienced intellectual property lawyers at Archer Finch Legal. Our diverse team of IP specialists protect your creative and business assets.',
	alternates: {
		canonical: '/team',
	},
}

export default async function TeamPage() {
	const teamMembersData = await getTeamMembers()

	return (
		<LevelTwoLayout
			title="Team"
			intro={[
				'Our team combines deep technical knowledge with practical legal expertise to protect what matters most to you.',
				'From experienced partners to rising specialists, each member brings a unique perspective and dedicated approach to intellectual property law.',
			]}
			content={teamMembersData.map((teamMember, index) => (
				<TeamMemberCard key={teamMember.slug} teamMember={teamMember} priority={index < 2} />
			))}
		/>
	)
}
