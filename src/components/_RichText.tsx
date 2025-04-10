import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type JSXConverters, type JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

function CustomUploadComponent({ node }: { node: SerializedUploadNode }) {
	if (node.relationTo === 'uploads') {
		const uploadDoc = node.value
		if (typeof uploadDoc !== 'object') {
			return null
		}
		const { alt, height, url, width } = uploadDoc
		return (
			<Image
				alt={alt}
				height={height}
				src={url}
				width={width}
				// placeholder="blur"
			/>
		)
	}

	return null
}

function createJsxConverters({ defaultConverters }: { defaultConverters: JSXConverters<DefaultNodeTypes> }) {
	return {
		...defaultConverters,
		upload: ({ node }: { node: SerializedUploadNode }) => <CustomUploadComponent node={node} />,
	}
}

export function RichTextContent({ lexicalData }: { lexicalData: SerializedEditorState }) {
	const jsxConverters = createJsxConverters as JSXConvertersFunction<DefaultNodeTypes>

	return <RichText converters={jsxConverters} data={lexicalData} />
}
