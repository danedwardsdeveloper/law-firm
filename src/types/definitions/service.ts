export type ServiceName =
	| 'Trademark protection'
	| 'IP due diligence'
	| 'Licensing agreement'
	| 'Patent application'
	| 'Copyright infringement'

interface Rendered {
	rendered: string
	protected?: boolean
}

interface Link {
	href: string
	targetHints?: {
		allow: string[]
	}
	embeddable?: boolean
	templated?: boolean
}

export interface WordPressService {
	id: number
	date: string
	date_gmt: string
	guid: Rendered
	modified: string
	modified_gmt: string
	slug: string
	status: string
	type: string
	link: string
	title: Rendered
	content: Rendered
	featured_media: number
	template: string
	class_list: string[]
	service_type: string
	_links: {
		self: Link[]
		collection: Link[]
		about: Link[]
		'wp:featuredmedia': Link[]
		'wp:attachment': Link[]
		curies: {
			name: string
			href: string
			templated: boolean
		}[]
	}
}

export type WordPressServiceApiResponse = WordPressService[]

export interface Service {
	title: string
	slug: string
	content: string
	photo: string
}
