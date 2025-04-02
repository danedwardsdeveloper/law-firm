import path from 'node:path'
import { wordpressRestApi } from '@/library/environment/publicVariables'
import logger from '@/library/logger'
import { downloadImage } from '@/library/utilities/server'
import type { TeamMember } from '@/types'
import urlJoin from 'proper-url-join'

let teamMembersCache: TeamMember[] | null = null

export async function getTeamMembers(): Promise<TeamMember[]> {
	if (teamMembersCache && teamMembersCache.length > 0) return teamMembersCache

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
				cms: 'wordpress',
				subFolder: 'team-members',
			})

			teamMembersData.push({
				id: teamMember.id.toString(),
				title: teamMember.title.rendered,
				slug: teamMember.slug,
				role: teamMember.role,
				metaTitle: teamMember.meta_title,
				metaDescription: teamMember.meta_desc,
				featuredImage: `/images/wordpress/team-members/${imageFileName}`,
				content: teamMember.content.rendered,
			})
		}

		const sortedTeamMembers = teamMembersData.sort((a, b) => {
			const getRoleOrder = (role: string) => {
				if (role.includes('Partner')) return 1
				if (role.includes('Associate')) return 2
				if (role.toLowerCase().includes('solicitor')) return 3
				return 4
			}

			const orderA = getRoleOrder(a.role)
			const orderB = getRoleOrder(b.role)

			if (orderA !== orderB) {
				return orderA - orderB
			}

			return a.title.localeCompare(b.title)
		})

		const deepCopy = JSON.parse(JSON.stringify(sortedTeamMembers))
		teamMembersCache = deepCopy

		return sortedTeamMembers
	} catch (error) {
		logger.error('getTeamMembers error: ', error)
		return []
	}
}

export async function getTeamMemberBySlug(slug: string) {
	const teamMemberData = await getTeamMembers()
	return teamMemberData.find((member) => member.slug === slug)
}
