import type { TeamMember } from '@/types/definitions/teamMember'
import urlJoin from 'proper-url-join'
import { wordpressApi } from '../environment/serverVariables'
import logger from '../logger'

let teamMembersCache: TeamMember[] | null = null

export async function getTeamMembers(): Promise<TeamMember[]> {
	if (teamMembersCache) return teamMembersCache

	try {
		const response = await fetch(urlJoin(wordpressApi, 'team_member'), {
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) throw new Error(`Response not ok: ${response.status}`)

		const data = await response.json()

		// biome-ignore lint/suspicious/noExplicitAny:
		const teamMembersData = data.map((item: any) => ({
			id: item.id.toString(),
			title: item.title.rendered,
			slug: item.slug,
			role: item.role,
			metaTitle: item.meta_title,
			metaDescription: item.meta_desc,
			featuredImage: item.featured_image_url,
			content: item.content.rendered,
		}))

		teamMembersCache = teamMembersData
		return teamMembersData
	} catch (error) {
		logger.error('getTeamMembers error: ', error)
		return []
	}
}

export async function getTeamMemberBySlug(slug: string) {
	const teamMemberData = await getTeamMembers()
	return teamMemberData.find((member) => member.slug === slug)
}
