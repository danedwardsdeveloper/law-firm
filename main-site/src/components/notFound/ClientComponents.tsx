'use client'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MissingPageTitle() {
	const pathname = usePathname()

	const childPath = () => {
		const segments = pathname.split('/').filter(Boolean)
		if (segments.length <= 1) return pathname
		return `/${segments[segments.length - 1]}`
	}

	return <span className="italic text-zinc-600">{childPath()}</span>
}

export function BackButton({ styles }: { styles: string }) {
	const pathname = usePathname()

	const getParentPath = () => {
		const segments = pathname.split('/').filter(Boolean)
		if (segments.length <= 1) return '/'
		return `/${segments[0]}`
	}

	return (
		<Link href={getParentPath()} className={styles}>
			<div className="flex items-center gap-x-2">
				<ArrowUturnLeftIcon className="size-6" />
				Back
			</div>
		</Link>
	)
}
