import ServiceCard from '@/components/ServiceCard'
import { getServices } from '@/library/wordpress/getServices'

export default async function ServicesPage() {
	const allServices = await getServices()
	return (
		<>
			<h1 className="text-4xl font-bold mb-12">Services</h1>
			<ul className="flex flex-col gap-y-16">
				{allServices.map((service, index) => (
					<ServiceCard key={index} service={service} priority={index < 2} />
				))}
			</ul>
		</>
	)
}
