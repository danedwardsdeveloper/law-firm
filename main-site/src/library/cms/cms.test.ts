import { describe, expect, test } from 'vitest'
import { getArticles, getServices } from './payload'
import { getTeamMembers } from './wordpress/getTeamMembers'

describe('Missing content', () => {
	test('Should have 13 articles', async () => {
		const allArticles = await getArticles()
		expect(allArticles.length).toBe(13)
	})

	test('Should have 5 services', async () => {
		const allServices = await getServices()
		expect(allServices.length).toBe(5)
	})

	test('Should have 8 team members', async () => {
		const allTeamMembers = await getTeamMembers()
		expect(allTeamMembers.length).toBe(8)
	})
})

/* 
pnpm vitest src/app/app
*/
