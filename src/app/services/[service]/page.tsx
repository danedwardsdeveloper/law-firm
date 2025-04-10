import BreadCrumbs from '@/components/BreadCrumbs'
import { getServiceBySlug, getServices } from '@/library/cms/payload/getServices'
import { titleMetadataPhrases } from '@/library/constants'
import { optimiseTitle } from '@/library/utilities/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { service: string }
type StaticParams = ResolvedParams[]
type Params = Promise<ResolvedParams>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const serviceSlug = (await params).service
	const serviceData = await getServiceBySlug(serviceSlug)

	if (!serviceData) notFound()

	return {
		title: optimiseTitle({
			base: serviceData.serviceType,
			additionalPhraseOptions: titleMetadataPhrases,
		}),
		openGraph: {
			images: [
				{
					url: serviceData.featuredImage.url,
					alt: serviceData.featuredImage.alt,
					height: 1200,
					width: 630,
				},
			],
		},
		description: serviceData.metaDescription,
		alternates: {
			canonical: `/services/${serviceData.slug}`,
		},
	}
}

export async function generateStaticParams(): Promise<StaticParams> {
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
		<>
			<BreadCrumbs trail={[{ display: 'Services', href: '/services' }]} current={serviceType} />
			<main className="max-w-prose" id="main-content">
				<h1 className="text-xl font-medium mb-4">{serviceType}</h1>
				<span className="block font-bold text-4xl mb-6 text-balance">{tagline}</span>
				<Image
					src={featuredImage.url}
					alt=""
					width={1920}
					height={1280}
					// placeholder="blur"
					className="w-full max-w-md rounded-md mb-12"
				/>
				<RichText data={content} className="flex flex-col gap-y-4" />
			</main>
		</>
	)
}
