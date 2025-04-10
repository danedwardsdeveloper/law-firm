'use client'
import { mergeClasses } from '@/library/utilities/browser'
import { Menu as MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import CTA from './CTA'
import CompanyLogo from './CompanyLogo'

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
			<nav data-component="MobileMenu" className="fixed bg-cream-50 w-full lg:hidden py-2 px-2 sm:px-4 border-b-2 border-zinc-100 text-xl">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="font-bold text-lg sm:text-2xl p-1 rounded-md active:bg-cream-100 transition-colors duration-300 flex items-center gap-x-2"
					>
						<CompanyLogo size="size-9" />
						Archer Finch Legal
					</Link>
					<MenuIcon className="size-10 p-1 active:bg-cream-100 transition-colors duration-300" onClick={toggleMobileMenuOpen} />
				</div>
				{mobileMenuOpen && (
					<ul className="flex flex-col gap-y-6 mt-12 mb-3 px-4 max-w-sm justify-self-end w-full sm:text-right bg-cream-100 fixed inset-0 h-80 top-9">
						{menuItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									onClick={() => setMobileMenuOpen(false)}
									className={mergeClasses(
										'block underline-offset-4 font-medium p-1 active:bg-cream-100 rounded-md w-full',
										pathname.includes(item.href) && ' underline',
									)}
								>
									{item.display}
								</Link>
							</li>
						))}
						<li>
							<CTA classes="w-full sm:max-w-sm" />
						</li>
					</ul>
				)}
			</nav>
			<nav
				data-component="DesktopMenu"
				className="w-full hidden lg:flex items-center justify-between py-2   lg:px-4 xl:px-12 border-b-2 border-zinc-200 text-xl"
			>
				<Link href="/" className="font-bold flex items-center gap-x-2">
					<CompanyLogo size="size-9" />
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
					<li>
						<CTA />
					</li>
				</ul>
			</nav>
		</>
	)
}
