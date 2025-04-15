'use client'
import { mergeClasses } from '@/library/utilities/browser'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Menu as MenuIcon, X as XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import CompanyLogo from './CompanyLogo'
import CTA from './CtaButton'

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
	const router = useRouter()

	return (
		<>
			<Disclosure as="nav" data-component="MobileMenu" className="fixed w-full lg:hidden">
				{({ close }) => (
					<>
						<div className="bg-cream-50 py-2 px-2 sm:px-4 border-b-2 border-cream-100 text-xl z-30">
							<div className="flex items-center justify-between">
								<Link
									href="/"
									className="font-bold text-lg sm:text-2xl p-1 rounded-md active:bg-cream-100 transition-colors duration-300 flex items-center gap-x-2"
								>
									<CompanyLogo size="size-9" />
									Archer Finch Legal
								</Link>
								<DisclosureButton className="group relative p-1 active:bg-cream-100 transition-colors duration-300 rounded-md">
									<span className="sr-only">Open main menu</span>
									<MenuIcon className="size-10 block group-data-[open]:hidden" aria-hidden="true" />
									<XIcon className="size-10 hidden group-data-[open]:block" aria-hidden="true" />
								</DisclosureButton>
							</div>
						</div>
						<DisclosurePanel className="lg:hidden transition duration-500 ease-in-out transform data-[closed]:opacity-0 data-[closed]:-translate-y-5">
							<div className="bg-cream-100 shadow-md px-4 pt-6 pb-4 border-b border-zinc-200 z-20">
								<ul className="flex flex-col gap-y-6 max-w-sm w-full">
									{menuItems.map((item) => (
										<li key={item.href}>
											{pathname.includes(item.href) ? (
												<span className="text-lg block underline-offset-4 p-2 bg-cream-50 font-semibold rounded-md w-full">
													{item.display}
												</span>
											) : (
												<button
													type="button"
													onClick={() => {
														setTimeout(() => {
															router.push(item.href)
															close()
														}, 1000)
													}}
													className="text-lg text-left underline-offset-4 font-medium p-2 active:bg-cream-50 rounded-md w-full"
												>
													{item.display}
												</button>
											)}
										</li>
									))}
									<li>
										<CTA
											classes="w-full sm:max-w-sm"
											onClick={() => {
												setTimeout(() => {
													close()
												}, 1000)
											}}
										/>
									</li>
								</ul>
							</div>
						</DisclosurePanel>
					</>
				)}
			</Disclosure>
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
