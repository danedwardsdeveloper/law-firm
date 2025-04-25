import NotFoundLayout from '@/components/NotFoundLayout'

export default function RootNotFound() {
	return (
		<NotFoundLayout //
			showStoryBrand={false}
			suggestedContent={<h1 className="text-center text-green-600 font-medium text-2xl mb-20">RootNotFound, rendered on the browser</h1>}
			useGrid={false}
		/>
	)
}
