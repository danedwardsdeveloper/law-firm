import companyIcon from '@/app/icon.svg'
import { getArticles, getServices } from '@/library/cms/payload'
import Image from 'next/image'
import Link from 'next/link'
import CopyrightNotice from './CopyrightNotice'
import { FaceBookLogo, InstagramLogo, XLogo, YouTubeLogo } from './SocialLogos'

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

// Optimisation ToDo: Make active links bold without using usePathname
export default async function Footer() {
	const servicesData = await getServices()

	const allArticlesData = await getArticles()
	const companyPages = allArticlesData.filter((article) => article.companyPage)
	const policyPages = allArticlesData.filter((article) => article.policyPage)

	interface LinkColum {
		heading: string
		links: { key: string | number; href: string; name: string }[]
	}

	const linksColumns: LinkColum[] = [
		{
			heading: 'Services',
			links: servicesData.map(({ serviceType, slug }) => ({
				key: serviceType,
				name: serviceType,
				href: `/services/${slug}`,
			})),
		},
		{
			heading: 'Policies',
			links: policyPages.map(({ id, slug, title }) => ({
				key: id,
				name: title,
				href: `/articles/${slug}`,
			})),
		},
		{
			heading: 'Company',
			links: companyPages.map(({ id, slug, title }) => ({
				key: id,
				name: title,
				href: `/articles/${slug}`,
			})),
		},
	]

	return (
		<footer className="bg-cream-100">
			<div className="px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
				<div className="mx-auto max-w-5xl xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8">
						{/* Company details */}
						<Image src={companyIcon} alt="Archer Finch Legal logo" className="size-9" />
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

					{/* Links columns */}
					<div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-12 md:col-span-3">
						{linksColumns.map(({ heading, links }) => (
							<div key={heading}>
								<h3 className="leading-6 font-semibold">{heading}</h3>
								<ul className="mt-6 space-y-4">
									{links.map(({ key, name, href }) => (
										<li key={key}>
											<Link href={href} className="leading-6 text-zinc-600 hover:text-zinc-900 transition-colors duration-300">
												{name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Copyright & credit */}
				<div className="mt-16 border-t border-zinc-900/10 pt-8 sm:mt-20 lg:mt-24 leading-6 text-zinc-600 flex flex-col-reverse text-right md:flex-row gap-y-8 md:justify-between">
					<CopyrightNotice />
					<p>
						Site by{' '}
						<Link href="https://danedwardsdeveloper.com/" className="text-zinc-600 link">
							Dan Edwards
						</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}
