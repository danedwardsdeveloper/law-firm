import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
	slug: 'media',
	versions: false,
	lockDocuments: false,
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
	],
	upload: true,
	hooks: {
		beforeChange: [
			({ data }) => {
				return data.featuredImage;
			},
		],
	},
};
