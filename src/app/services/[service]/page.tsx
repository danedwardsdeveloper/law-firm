import { getServiceBySlug } from '@/library/cms/payload/getServices'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ResolvedParams = { service: string }
type StaticParams = ResolvedParams[]
type Params = Promise<ResolvedParams>

export async function generateStaticParams(): Promise<StaticParams> {
	return [{ service: 'IP due diligence' }]
}

export default async function ServicePage({ params }: { params: Params }) {
	const serviceSlug = (await params).service
	const serviceData = await getServiceBySlug(serviceSlug)

	if (!serviceData) return notFound()

	const { title, content, photo } = serviceData

	return (
		<>
			<span className="font-bold text-3xl mb-6">{/* First paragraph here */}</span>
			<h1 className="text-xl font-medium mb-12">{title}</h1>
			<Image src={photo} alt="" width={1920} height={1280} />
			<div
				className="flex flex-col gap-y-4 leading-7 text-zinc-700 max-w-prose text-lg"
				// biome-ignore lint/security/noDangerouslySetInnerHtml:
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</>
	)
}
