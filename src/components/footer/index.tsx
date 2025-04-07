import { getServices } from '@/library/cms/payload/getServices'
import Link from 'next/link'
import { footerLinks, socialLinks } from './data'

export default async function Footer() {
	const servicesData = await getServices()
	const servicesLinks = servicesData.slice(0, 4).map((item) => ({
		name: item.serviceType,
		href: `/services/${item.slug}`,
	}))

	return (
		<footer className="bg-amber-100">
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8">
						{/* Company details */}
						<div className="size-9 bg-purple-300 rounded" />
						<p className="text-balance leading-6 ">
							<strong>Archer Finch Legal</strong>
							<br />
							<span className="text-zinc-600">Intellectual property lawyers, London</span>
						</p>

						{/* Social links */}
						<div className="flex gap-x-6">
							{socialLinks.map((item) => (
								<Link key={item.name} href={item.href} className="text-zinc-600 hover:text-zinc-800 transition-colors duration-300">
									<span className="sr-only">{item.name}</span>
									<item.icon />
								</Link>
							))}
						</div>
					</div>

					{/* Link columns */}
					<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="leading-6 font-semibold">Services</h3>
								<ul className="mt-6 space-y-4">
									{servicesLinks.map((item) => (
										<li key={item.name}>
											<Link href={item.href} className="leading-6 text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="leading-6 font-semibold">{footerLinks[0].title}</h3>
								<ul className="mt-6 space-y-4">
									{footerLinks[0].links.map((item) => (
										<li key={item.name}>
											<Link href={item.href} className="leading-6 text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="leading-6 font-semibold">{footerLinks[1].title}</h3>
								<ul className="mt-6 space-y-4">
									{footerLinks[1].links.map((item) => (
										<li key={item.name}>
											<Link href={item.href} className="leading-6 text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="leading-6 font-semibold">{footerLinks[2].title}</h3>
								<ul className="mt-6 space-y-4">
									{footerLinks[2].links.map((item) => (
										<li key={item.name}>
											<Link href={item.href} className="leading-6 text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Copyright & credit */}
				<div className="mt-16 border-t border-zinc-900/10 pt-8 sm:mt-20 lg:mt-24 leading-6 text-zinc-600 flex justify-between">
					<p>&copy; 1998 - {new Date().getFullYear()} Archer Finch Legal LLP. All rights reserved.</p>
					<p>
						Site by{' '}
						<Link href="https://danedwardsdeveloper.com/" className="hover:text-zinc-900 transition-colors duration-300">
							Dan Edwards
						</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}
