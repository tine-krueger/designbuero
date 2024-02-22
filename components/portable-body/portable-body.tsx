import { PortableText, PortableTextComponents, PortableTextProps } from '@portabletext/react'
import { FC, PropsWithChildren } from 'react'
import { PartiallyOptional } from '../../types/partially-optional'
import { Headline } from '../headline/headline'

export const components: PortableTextComponents = {
	block: {
		// h1: Headline as unknown as PortableTextBlockComponent,
		// Ex. 1: customizing common block types
		h1: ({ children }) => <Headline priority={1}>{children}</Headline>,
		h2: ({ children }) => <Headline priority={2}>{children}</Headline>,
		h3: ({ children }) => <Headline priority={3}>{children}</Headline>,
		// h4: ({ children }) => <Headline priority={4}>{children}</Headline>,
		// h5: ({ children }) => <Headline priority={5}>{children}</Headline>,
	},
	// types: {
	// 	rawHtml: ({ value }) => <RawHtml content={value.code}></RawHtml>,
	// 	button: ({ value }) => <Button noHorizontalSpacing={true} {...value} />,
	// 	code: ({ value }) => {
	// 		return <CodeSnippet {...value} />
	// 	},
	// },
	// marks: {
	// 	link: ({ value, children }) => <SharedLink {...value}>{children}</SharedLink>,
	// 	currentYear: () => <span>{new Date().getFullYear()}</span>,
	// },
}

export const PortableBody: FC<PropsWithChildren<PartiallyOptional<PortableTextProps, 'value'>>> = (props) => {
	if (!props.value) {
		return null
	}

	return <PortableText {...(props as PortableTextProps)} components={components}></PortableText>
}
