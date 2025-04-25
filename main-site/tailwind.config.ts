import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'cream-50': '#faf9f5',
				'cream-100': '#f0eee6',
				fontSize: {
					base: 'var(--text-lg)',
				},
			},
		},
	},
} satisfies Config
