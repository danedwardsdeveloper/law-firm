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
				'bg-green-600 hover:bg-green-500 sm:hover:bg-green-400  active:bg-green-400 sm:active:bg-green-500 hover:shadow-md active:shadow-md  transition-all duration-300 px-4 py-1 rounded-lg font-bold text-xl text-white',
				classes,
			)}
		>
			Contact us
		</button>
	)
}
