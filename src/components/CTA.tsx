'use client'
import { mergeClasses } from '@/library/utilities/browser'
import { useProvider } from './Provider'

/**
 * Opens the contact form modal
 * Accepts an optional onClick property so that the CTA on the mobile menu can close the mobile menu panel at the same time, otherwise scrolling is disabled and the form isn't useable
 */
export default function CTA({ classes, onClick }: { classes?: string; onClick?: () => void }) {
	const { setContactFormVisible } = useProvider()

	const handleClick = () => {
		setContactFormVisible(true)
		if (onClick) onClick()
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className={mergeClasses(
				'bg-green-600 hover:bg-green-500 active:bg-green-400 sm:active:bg-green-500 hover:shadow-md active:shadow-md  transition-all duration-300 px-4 py-1 rounded-lg font-bold text-xl text-white',
				classes,
			)}
		>
			Contact us
		</button>
	)
}
