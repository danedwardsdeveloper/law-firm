'use client'
import { mergeClasses } from '@/library/utilities/browser'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
	{
		display: 'Services',
		href: '/services',
	},
	{
		display: 'About',
		href: '/about',
	},
	{
		display: 'Team',
		href: '/team',
	},
	{
		display: 'Testimonials',
		href: '/testimonials',
	},
	{
		display: 'Articles',
		href: '/articles',
	},
]

export default function Menu() {
	const pathname = usePathname()

	return (
		<nav className="w-full flex justify-between py-5 px-12 border-b-2 border-zinc-200 text-xl">
			<Link href="/" className="font-bold">
				Archer Finch Legal
			</Link>
			<ul className="flex gap-x-8">
				{menuItems.map((item) => (
					<li key={item.href}>
						<Link href={item.href} className={mergeClasses('underline-offset-4', pathname.includes(item.href) && ' underline')}>
							{item.display}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
