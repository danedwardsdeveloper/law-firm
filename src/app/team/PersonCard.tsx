import Link from 'next/link'

export interface PersonCardProps {
	name: string
	specialty: string
	slug: string
}

export default function PersonCard({ name, specialty, slug }: PersonCardProps) {
	return (
		<Link href={`/team/${slug}`}>
			<h2 className="text-xl font-medium">{name}</h2>
			<p>{specialty}</p>
			<div className="w-full aspect-square bg-blue-100 rounded-sm" />
		</Link>
	)
}
