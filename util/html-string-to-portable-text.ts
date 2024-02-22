import { TypedObject } from '@portabletext/types'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'

export const htmlStringToPortableText = (htmlString?: string, title?: string, name?: string): TypedObject | TypedObject[] => {
	if (!htmlString) {
		return []
	}

	const defaultSchema = Schema.compile({
		name: 'defaultSchema',
		types: [
			{
				type: 'object',
				name: 'portableText',
				fields: [
					{
						title: 'Body',
						name: 'body',
						type: 'array',
						of: [{ type: 'block' }],
					},
				],
			},
		],
	})

	const dataBlocks = () => {
		const blockContentType = defaultSchema.get('portableText').fields.find((field: Record<string, string | []>) => field.name === 'body').type

		const blocks = htmlToBlocks(htmlString, blockContentType, {
			parseHtml: (html) => new JSDOM(html).window.document,
		})

		return blocks
	}

	return dataBlocks()
}
