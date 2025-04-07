import { FaceBookLogo, InstagramLogo, XLogo, YouTubeLogo } from './SocialLogos'

export const footerLinks: { title: string; links: { name: string; href: string }[] }[] = [
	{
		title: 'Support',
		links: [
			{ name: 'Submit ticket', href: '#' },
			{ name: 'Documentation', href: '#' },
			{ name: 'Guides', href: '#' },
		],
	},
	{
		title: 'Company',
		links: [
			{ name: 'About', href: '#' },
			{ name: 'Blog', href: '#' },
			{ name: 'Jobs', href: '#' },
			{ name: 'Press', href: '#' },
		],
	},
	{
		title: 'Legal',
		links: [
			{ name: 'Terms of service', href: '#' },
			{ name: 'Privacy policy', href: '#' },
			{ name: 'License', href: '#' },
		],
	},
]

export const socialLinks = [
	{
		name: 'Facebook',
		href: '#',
		icon: () => <FaceBookLogo />,
	},
	{
		name: 'Instagram',
		href: '#',
		icon: () => <InstagramLogo />,
	},
	{
		name: 'X',
		href: '#',
		icon: () => <XLogo />,
	},
	{
		name: 'YouTube',
		href: '#',
		icon: () => <YouTubeLogo />,
	},
]
