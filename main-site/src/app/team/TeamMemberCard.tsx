import type { TeamMember } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamMemberCard({
	teamMember: { slug, featuredImage, metaDescription, title, role, content },
	priority,
}: { teamMember: TeamMember; priority: boolean }) {
	return (
		<Link href={`/team/${slug}`}>
			<Image
				src={featuredImage}
				alt={metaDescription}
				width={1200}
				height={630}
				priority={priority}
				className="rounded-md w-full mb-2"
				sizes="(max-width: 639px) calc(100vw - 1rem), 
       (min-width: 640px) and (max-width: 767px) calc(100vw - 1.5rem), 
       (min-width: 768px) min(calc((min(100vw, 42rem) - 2rem) / 2), 30.375rem)"
			/>
			<h2 className="text-xl font-medium mb-1">{`${title}, ${role}`}</h2>
			<p
				className="mb-2 line-clamp-2"
				// biome-ignore lint/security/noDangerouslySetInnerHtml:
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</Link>
	)
}
