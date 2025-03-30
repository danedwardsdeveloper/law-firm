import { getTeamMemberBySlug, getTeamMembers } from '@/library/wordpress/getTeamMembers'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { teamMember: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const resolvedParams = await params
	const teamMemberSlug = resolvedParams.teamMember
	const teamMember = await getTeamMemberBySlug(teamMemberSlug)

	if (!teamMember) {
		throw new Error('Team member not found')
	}

	return {
		title: `${teamMember.title} | Archer Finch Legal, intellectual property lawyers`,
		description: teamMember.metaDescription,
		openGraph: {
			images: [teamMember.featuredImage],
		},
		alternates: {
			canonical: `/team/${teamMember.slug}`,
		},
	}
}

export async function generateStaticParams(): StaticParams {
	const teamMembersData = await getTeamMembers()
	return teamMembersData.map((teamMember) => ({
		teamMember: teamMember.slug,
	}))
}

export default async function TeamMemberPage({ params }: { params: Params }) {
	const teamMemberSlug = (await params).teamMember
	const teamMember = await getTeamMemberBySlug(teamMemberSlug)

	if (!teamMember) {
		notFound()
	}

	return (
		<div className="flex flex-col gap-y-4">
			<p className="font-medium">{teamMember.role}</p>
			<h1>{teamMember.title}</h1>
			<Image
				src={teamMember.featuredImage}
				alt={teamMember.metaDescription}
				width={1200}
				height={630}
				priority
				sizes="421"
				className="max-w-xl rounded-md mb-12"
			/>
			<div
				className="flex flex-col gap-y-4 leading-7 text-zinc-700 max-w-prose text-lg"
				// biome-ignore lint/security/noDangerouslySetInnerHtml:
				dangerouslySetInnerHTML={{ __html: teamMember.content }}
			/>
		</div>
	)
}
