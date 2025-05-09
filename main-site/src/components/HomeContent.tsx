import ArticleCard from '@/app/articles/ArticleCard'
import TeamMemberCard from '@/app/team/TeamMemberCard'
import { testimonials } from '@/app/testimonials/data'
import { getArticles, getServices } from '@/library/cms/payload'
import { getTeamMembers } from '@/library/cms/wordpress/getTeamMembers'
import { mergeClasses } from '@/library/utilities/browser'
import Link from 'next/link'
import type { ReactNode } from 'react'
import CtaSection from './CtaSection'
import ServiceCard from './ServiceCard'
import { TestimonialCard } from './TestimonialCard'
import Hero from './hero'

/**
 * @description Exported for use in the RootNotFound page
 */
export default async function HomeContent() {
	const allTeamMembers = await getTeamMembers()
	const allServices = await getServices()
	const allArticles = await getArticles()

	interface SectionProps {
		heading: string
		intro: string
		content: ReactNode
		linkText: string
		linkTarget: string
	}

	const sectionContent: SectionProps[] = [
		{
			heading: 'Services',
			intro:
				'Our experienced team delivers strategic guidance across trademarks, patents, licensing, and copyright protection, ensuring your intellectual property works for your business, not against it.',
			content: allServices.slice(0, 2).map((service, index) => <ServiceCard key={service.id} service={service} priority={index < 2} />),
			linkText: 'See all services',
			linkTarget: '/services',
		},
		{
			heading: 'Testimonials',
			intro: 'What people have to say about our award-winning IP law firm',
			content: testimonials
				.slice(0, 2)
				.map((testimonial) => <TestimonialCard key={testimonial.writer.name} testimonial={testimonial} priority={false} />),
			linkText: 'See all testimonials',
			linkTarget: '/testimonials',
		},
		{
			heading: 'Articles',
			intro: 'Read our latest writing on intellectual property',
			content: allArticles.slice(0, 2).map((article) => <ArticleCard key={article.slug} article={article} priority={false} />),
			linkText: 'See all articles',
			linkTarget: '/articles',
		},
		{
			heading: 'Team',
			intro: 'Learn more about our incredible team',
			content: allTeamMembers
				.slice(0, 2)
				.map((teamMember, index) => <TeamMemberCard key={teamMember.slug} teamMember={teamMember} priority={index < 2} />),
			linkText: 'See all team members',
			linkTarget: '/team',
		},
	]

	return (
		<>
			<section className="max-w-4xl w-full mx-auto px-4 lg:px-12 xl:px-0 sm:min-h-[90vh] mt-6 sm:mt-6 md:mt-12 lg:mt-20 mb-20 md:mb-0">
				<Hero />
			</section>
			{sectionContent.map(({ heading, intro, content, linkText, linkTarget }, index) => (
				<div key={heading} className={mergeClasses(!(index % 2) && 'bg-cream-100')}>
					<section className="max-w-4xl w-full mx-auto px-4 lg:px-12 xl:px-0 py-20">
						<h2 className="text-4xl font-bold mb-8 text-balance">{heading}</h2>
						<p className="mb-12 max-w-prose">{intro}</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-12">{content}</div>
						<Link href={linkTarget} className="link text-zinc-600">
							{linkText}
						</Link>
					</section>
				</div>
			))}
			<CtaSection />
		</>
	)
}
