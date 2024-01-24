import { nodeParse, transformToPortableText } from '@kontent-ai/rich-text-resolver'
import { TypedObject } from '@portabletext/types'

export const htmlStringToPortableText = (htmlString?: string): TypedObject | TypedObject[] => {
	if (!htmlString) {
		return []
	}

	const cleanSring = htmlString.replace(/(<span)([^>]*)>|(<\/span>)/g, '')
	const parsedTree = nodeParse(cleanSring)

	const portableText: TypedObject | TypedObject[] = transformToPortableText(parsedTree)
	return portableText
}
