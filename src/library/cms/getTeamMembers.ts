import path from 'node:path'
import type { TeamMember } from '@/types/definitions/teamMember'
import urlJoin from 'proper-url-join'
import { wordpressRestApi } from '../environment/publicVariables'
import logger from '../logger'
import { downloadImage } from './downloadImage'

let teamMembersCache: TeamMember[] | null = null

export async function getTeamMembers(): Promise<TeamMember[]> {
	if (teamMembersCache) return teamMembersCache

	try {
		const response = await fetch(urlJoin(wordpressRestApi, 'team_member'), {
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) throw new Error(`Response not ok: ${response.status}`)

		const data = await response.json()

		const teamMembersData = []

		for (const teamMember of data) {
			const imageFileName = path.basename(teamMember.featured_image_url)

			await downloadImage({
				imageFileName,
				saveToApp: true,
				saveToPublic: true,
			})

			teamMembersData.push({
				id: teamMember.id.toString(),
				title: teamMember.title.rendered,
				slug: teamMember.slug,
				role: teamMember.role,
				metaTitle: teamMember.meta_title,
				metaDescription: teamMember.meta_desc,
				featuredImage: `/images/${imageFileName}`,
				content: teamMember.content.rendered,
			})
		}

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
