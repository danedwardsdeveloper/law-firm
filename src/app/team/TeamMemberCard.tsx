import type { TeamMember } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamMemberCard({ teamMember, priority }: { teamMember: TeamMember; priority: boolean }) {
	return (
		<Link href={`/team/${teamMember.slug}`}>
			<h2 className="text-xl font-medium">{teamMember.title}</h2>
			<p className="mb-2">{teamMember.role}</p>
			<Image
				src={teamMember.featuredImage}
				alt={teamMember.metaDescription}
				width={1200}
				height={630}
				priority={priority}
				className="rounded-md"
			/>
		</Link>
	)
}
