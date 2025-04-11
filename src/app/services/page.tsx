import LevelTwoPageLayout from '@/components/LevelTwoPageLayout'
import ServiceCard from '@/components/ServiceCard'
import { getServices } from '@/library/cms/payload/getServices'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: optimiseTitle({ base: 'Services', additionalPhraseOptions: titleMetadataPhrases }),
	description:
		'We offer legal services such as copyright enforcement, patent applications, licensing agreements, IP due diligence, and strategic trademark protection.',
	alternates: {
		canonical: '/services',
	},
}

export default async function ServicesPage() {
	const allServices = await getServices()
	if (!allServices) return notFound()

	return (
		<LevelTwoPageLayout
			title="Services"
			intro={[
				'Our specialized intellectual property services help businesses protect their most valuable assets.',
				'With decades of experience and a proven track record, our team provides strategic legal advice tailored to your specific industry and needs.',
			]}
			content={allServices.map((service, index) => <ServiceCard key={service.id} service={service} priority={index < 2} />)}
		/>
	)
}
