import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTeamMemberBySlug, team } from '../data'

type ResolvedParams = { teamMember: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const teamMemberSlug = (await params).teamMember
	const teamMember = getTeamMemberBySlug(teamMemberSlug)

	if (!teamMember) {
		throw new Error('Team member not found')
	}

	return {
		title: teamMember.name,
	}
}

export async function generateStaticParams(): StaticParams {
	return team.map((person) => ({
		teamMember: person.slug,
	}))
}

export default async function TeamMemberPage({ params }: { params: Params }) {
	const teamMemberSlug = (await params).teamMember
	const teamMember = getTeamMemberBySlug(teamMemberSlug)

	if (!teamMember) {
		notFound()
	}

	return (
		<>
			<h1>{teamMember.name}</h1>
			<p>{teamMember.specialty}</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
				ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
				in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</>
	)
}
