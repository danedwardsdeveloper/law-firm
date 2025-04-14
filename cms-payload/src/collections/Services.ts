import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  versions: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'serviceType',
      type: 'text',
      label: 'Service Type',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      required: true,
      minLength: 70,
      maxLength: 155,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Featured Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
  ],
}
