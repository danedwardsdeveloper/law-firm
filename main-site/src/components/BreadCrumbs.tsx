import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export type BreadCrumbTrail = Array<{ display: string; href: string }>

export default function BreadCrumbs({
	trail,
	current,
}: {
	trail?: BreadCrumbTrail
	current: string
}) {
	return (
		<nav className="mb-12">
			<ul className="flex flex-wrap items-center gap-y-2 gap-x-3">
				<li className="flex gap-x-3 items-center break-all">
					<Link href="/" className="text-zinc-600 link">
						Home
					</Link>
					<ChevronRightIcon className="size-5 text-zinc-600 flex-shrink-0" aria-hidden />
				</li>
				{trail?.map((item) => (
					<li key={item.href} className="flex gap-x-3 items-center">
						<Link href={item.href} className="text-zinc-600 link">
							{item.display}
						</Link>
						<ChevronRightIcon className="size-5 text-zinc-600 flex-shrink-0" aria-hidden />
					</li>
				))}
				<li className="font-semibold">{current}</li>
			</ul>
		</nav>
	)
}
