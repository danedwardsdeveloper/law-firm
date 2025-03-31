'use client'
import { mergeClasses } from '@/library/utilities/browser'
import { useProvider } from './Provider'

export default function CTA({ classes }: { classes?: string }) {
	const { setContactFormVisible } = useProvider()
	return (
		<button
			type="button"
			onClick={() => setContactFormVisible(true)}
			className={mergeClasses(
				'bg-green-300 hover:bg-green-400 hover:shadow-md active:shadow-md active:bg-green-500 transition-all duration-300 px-4 py-2 rounded-lg font-bold text-xl',
				classes,
			)}
		>
			Contact us
		</button>
	)
}
