import LevelThreeLayout from '@/components/LevelThreeLayout'
import { getTeamMemberBySlug, getTeamMembers } from '@/library/cms/wordpress/getTeamMembers'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { teamMember: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const teamMemberSlug = (await params).teamMember
	const teamMember = await getTeamMemberBySlug(teamMemberSlug)

	if (!teamMember) throw new Error('Team member not found')

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

	if (!teamMember) notFound()

	const { title, role, featuredImage, metaDescription, content } = teamMember

	return (
		<LevelThreeLayout
			title={`${title}, ${role}`}
			breadCrumbTrail={[{ display: 'Team', href: '/team' }]}
			intro={[metaDescription]}
			content={
				<>
					<Image
						src={featuredImage}
						alt={metaDescription}
						width={1200}
						height={630}
						priority
						className="w-full max-w-xl rounded-md mb-12"
						sizes="(max-width: 639px) min(calc(100vw - 1rem), 36rem), 
       min(calc(100vw - 1.5rem), 36rem)"
					/>
					<div
						className="flex flex-col gap-y-8 leading-8 text-zinc-700 max-w-prose text-lg"
						// biome-ignore lint/security/noDangerouslySetInnerHtml:
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</>
			}
		/>
	)
}
