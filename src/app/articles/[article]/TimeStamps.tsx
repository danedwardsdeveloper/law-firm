import { formatDate } from '@/library/utilities/browser'
import { differenceInDays } from 'date-fns'

export default function TimeStamps({ createdAt, updatedAt }: { createdAt: Date; updatedAt: Date }) {
	const createdAtDate = new Date(createdAt)
	const updatedAtDate = new Date(updatedAt)
	const hasBeenUpdated = differenceInDays(updatedAtDate, createdAtDate) > 0

	return (
		<div className="text-zinc-700 max-w-prose text-lg">
			<p>
				<span>Published </span>
				<time>{formatDate(createdAtDate)}</time>
			</p>
			{hasBeenUpdated && (
				<p>
					<span>Updated </span>
					<time>{formatDate(updatedAtDate)}</time>
				</p>
			)}
		</div>
	)
}
