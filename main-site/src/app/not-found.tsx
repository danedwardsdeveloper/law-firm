import NotFound from '@/components/notFound'
import { HomePageContent } from './page'

export default function RootNotFound() {
	return (
		<NotFound //
			showStoryBrand={false}
			suggestedContent={<HomePageContent />}
			useGrid={false}
		/>
	)
}
