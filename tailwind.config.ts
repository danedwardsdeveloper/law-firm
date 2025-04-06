import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontSize: {
				base: '1.125rem',
			},
		},
	},
} satisfies Config
