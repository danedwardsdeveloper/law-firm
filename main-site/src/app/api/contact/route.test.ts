import { dynamicBaseURL } from '@/library/environment/publicVariables'
import fetch from 'node-fetch'
import urlJoin from 'proper-url-join'
import { describe, expect, test } from 'vitest'
import type { ContactPOSTbody } from './route'

async function makeRequest(body: object) {
	const url = urlJoin(dynamicBaseURL, '/api/contact')
	return await fetch(url, { method: 'POST', body: JSON.stringify(body) })
}

const validBody: ContactPOSTbody = {
	email: 'myemail@gmail.com',
	message:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

const scriptingAttacks = [
	"<script>alert('XSS');</script>",
	"<img src='x' onerror='alert(1)'>",
	"'; DROP TABLE users; --",
	'1=1; SELECT * FROM users',
	'$(rm -rf /)',
	"{{constructor.constructor('alert(1)')()}}",
	'${process.env.SECRET_KEY}',
	"<iframe src='javascript:alert(`xss`)'>",
	"admin' OR '1'='1",
	"admin' --",
	"';exec(open('/etc/passwd').read());#",
	'data/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
	'<svg onload=alert(1)>',
	'\u003cscript\u003ealert(1)\u003c/script\u003e',
	'javascript(document.cookie)',
	"' UNION SELECT username, password FROM users --",
	'><s>%2Bonfocus=alert(document.cookie)%2B autofocus=',
]

describe('POST /api/contact', () => {
	test('Reject with missing email', async () => {
		const request = await makeRequest({ ...validBody, email: undefined })
		expect(request.status).toBe(400)
	})

	test('Reject with missing message', async () => {
		const request = await makeRequest({ ...validBody, message: undefined })
		expect(request.status).toBe(400)
	})

	test('Reject with invalid email', async () => {
		const request = await makeRequest({ ...validBody, email: 'invalid@com' })
		expect(request.status).toBe(400)
	})

	test('Accept a valid body', async () => {
		const request = await makeRequest(validBody)
		expect(request.status).toBe(200)
	})

	test('pretends to accept requests with the honeypot', async () => {
		const request = await makeRequest({ ...validBody, website: 'mysite.com' })
		expect(request.status).toBe(200)
	})

	for (const attack of scriptingAttacks) {
		test(`Scripting attack: ${attack}`, async () => {
			const request = await makeRequest({ ...validBody, message: attack })
			expect(request.status).toBe(400)
		})
	}
})

/* 
pnpm vitest src/app/api/contact/route.test.ts
*/
