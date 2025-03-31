'use client'
import { mergeClasses } from '@/library/utilities/browser'
import { Menu as MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import CTA from './CTA'

const menuItems = [
	{
		display: 'Services',
		href: '/services',
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const toggleMobileMenuOpen = () => {
		setMobileMenuOpen((current) => !current)
	}

	return (
		<>
			<nav data-component="MobileMenu" className="w-full lg:hidden  py-2 px-4 border-b-2 border-zinc-100 text-xl">
				<div className="flex items-center justify-between">
					<Link href="/" className="font-bold">
						Archer Finch Legal
					</Link>
					<MenuIcon className="size-7" onClick={toggleMobileMenuOpen} />
				</div>
				{mobileMenuOpen && (
					<ul className="flex flex-col gap-y-6 mt-6">
						{menuItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className={mergeClasses('underline-offset-4 font-medium', pathname.includes(item.href) && ' underline')}
								>
									{item.display}
								</Link>
							</li>
						))}
					</ul>
				)}
				<CTA />
			</nav>
			<nav
				data-component="DesktopMenu"
				className="w-full hidden lg:flex items-center justify-between py-2 px-12 border-b-2 border-zinc-200 text-xl"
			>
				<Link href="/" className="font-bold">
					Archer Finch Legal
				</Link>
				<ul className="flex items-center gap-x-8">
					{menuItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className={mergeClasses('underline-offset-4 font-medium', pathname.includes(item.href) && ' underline')}
							>
								{item.display}
							</Link>
						</li>
					))}
				</ul>
				<CTA />
			</nav>
		</>
	)
}
