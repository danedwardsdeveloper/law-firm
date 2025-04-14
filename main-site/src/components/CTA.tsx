'use client'
import { mergeClasses } from '@/library/utilities/browser'
import { useProvider } from './Provider'

/**
 * Opens the contact form modal
 * Accepts an optional onClick property so that the CTA on the mobile menu can close the mobile menu panel at the same time, otherwise scrolling is disabled and the form isn't useable
 */
export default function CTA({ classes, onClick, invertColours }: { classes?: string; onClick?: () => void; invertColours?: boolean }) {
	const { setContactFormVisible } = useProvider()

	const handleClick = () => {
		setContactFormVisible(true)
		if (onClick) onClick()
	}

	const colourClasses = 'bg-green-600 hover:bg-green-500 active:bg-green-400 sm:active:bg-green-500 text-white'
	const invertedColourClasses = 'bg-white hover:bg-zinc-100 active:bg-zinc-100 sm:active:bg-zinc-200 text-green-600'

	return (
		<button
			type="button"
			onClick={handleClick}
			className={mergeClasses(
				'hover:shadow-md active:shadow-md  transition-all duration-300 px-4 py-1 rounded-lg font-bold text-xl ',
				invertColours ? invertedColourClasses : colourClasses,
				classes,
			)}
		>
			Contact us
		</button>
	)
}
