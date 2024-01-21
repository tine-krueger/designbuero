import { nodeParse, transformToPortableText } from '@kontent-ai/rich-text-resolver'
import { TypedObject } from '@portabletext/types'

export const htmlStringToPortableText = (htmlString: string): TypedObject | TypedObject[] => {
	const parsedTree = nodeParse(htmlString)
	const portableText: TypedObject | TypedObject[] = transformToPortableText(parsedTree)
	return portableText
}
