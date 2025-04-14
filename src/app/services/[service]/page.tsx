import LevelThreeLayout from '@/components/LevelThreeLayout'
import { getServiceBySlug, getServices } from '@/library/cms/payload/getServices'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { service: string }
type Params = Promise<ResolvedParams>
type StaticParams = Promise<ResolvedParams[]>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const serviceSlug = (await params).service
	const serviceData = await getServiceBySlug(serviceSlug)
	if (!serviceData) notFound()
	const { serviceType, metaDescription, slug, featuredImage } = serviceData

	return {
		title: optimiseTitle({
			base: serviceType,
			additionalPhraseOptions: titleMetadataPhrases,
		}),
		openGraph: {
			images: [
				{
					url: featuredImage.url,
					alt: featuredImage.alt,
					height: 1200,
					width: 630,
				},
			],
		},
		description: metaDescription,
		alternates: {
			canonical: `/services/${slug}`,
		},
	}
}

export async function generateStaticParams(): StaticParams {
	const allServices = await getServices()
	return allServices.map((service) => ({
		service: service.slug,
	}))
}

export default async function ServicePage({ params }: { params: Params }) {
	const serviceSlug = (await params).service
	const serviceData = await getServiceBySlug(serviceSlug)
	if (!serviceData) return notFound()
	const { tagline, serviceType, content, featuredImage } = serviceData

	return (
		<LevelThreeLayout
			title={serviceType}
			breadCrumbTrail={[{ display: 'Services', href: '/services' }]}
			intro={[tagline]}
			content={
				<>
					<Image
						src={featuredImage.url}
						alt=""
						width={1920}
						height={1280}
						// placeholder="blur"
						className="w-full max-w-md rounded-md mb-12"
					/>
					<RichText data={content} className="flex flex-col gap-y-4" />
				</>
			}
		/>
	)
}
