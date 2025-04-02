import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: 'localhost' }],
	},
	async headers() {
		return [
			{
				source: '/robots.txt', // Allow Lighthouse to download robots.txt
				headers: [
					{
						key: 'Content-Security-Policy',
						value: "connect-src 'self'; script-src 'none'; object-src 'none'; frame-src 'none'",
					},
				],
			},
		]
	},
}

export default nextConfig
