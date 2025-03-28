import type { PersonCardProps } from './PersonCard'

export const team: PersonCardProps[] = [
	{
		name: 'Name One',
		specialty: 'Digital assets',
		slug: 'name-one',
	},
	{
		name: 'Name Two',
		specialty: 'Copyright',
		slug: 'name-two',
	},
	{
		name: 'Name Three',
		specialty: 'Digital assets',
		slug: 'name-three',
	},
	{
		name: 'Name Four',
		specialty: 'NFTs',
		slug: 'name-four',
	},
]

export function getTeamMemberBySlug(slug: string) {
	return team.find((member) => member.slug === slug)
}
