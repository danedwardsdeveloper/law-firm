import BreadCrumbs from '@/components/BreadCrumbs'
import { getTeamMemberBySlug, getTeamMembers } from '@/library/cms/wordpress/getTeamMembers'
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
		<>
			<BreadCrumbs trail={[{ display: 'Team', href: '/team' }]} current={teamMember.title} />
			<main className="flex flex-col gap-y-4" id="main-content">
				<p className="font-medium">{teamMember.role}</p>
				<h1>{teamMember.title}</h1>
				<Image
					src={teamMember.featuredImage}
					alt={teamMember.metaDescription}
					width={1200}
					height={630}
					priority
					sizes="421"
					placeholder="blur"
					className="w-full max-w-xl rounded-md mb-12"
				/>
				<div
					className="flex flex-col gap-y-8 leading-8 text-zinc-700 max-w-prose text-lg"
					// biome-ignore lint/security/noDangerouslySetInnerHtml:
					dangerouslySetInnerHTML={{ __html: teamMember.content }}
				/>
			</main>
		</>
	)
}
