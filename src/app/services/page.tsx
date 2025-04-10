import BreadCrumbs from '@/components/BreadCrumbs'
import ServiceCard from '@/components/ServiceCard'
import { getServices } from '@/library/cms/payload/getServices'
import { notFound } from 'next/navigation'

export default async function ServicesPage() {
	const allServices = await getServices()

	if (!allServices) return notFound()

	return (
		<>
			<BreadCrumbs current="Services" />
			<main id="main-content">
				<h1 className="text-4xl font-bold mb-12 text-zinc-900">Services</h1>
				<ul className="flex flex-col gap-y-16">
					{allServices.map((service, index) => (
						<ServiceCard key={service.id} service={service} priority={index < 2} />
					))}
				</ul>
			</main>
		</>
	)
}
