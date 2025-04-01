import type { Service } from '@/types'
import Image from 'next/image'

export default function ServiceCard({ service, priority = false }: { service: Service; priority?: boolean }) {
	return (
		<li className="flex flex-col gap-y-2">
			<div className="">{service.title}</div>
			<Image src={service.photo} alt="" height={1920} width={1281} priority={priority} className="w-full max-w-md" />
		</li>
	)
}
