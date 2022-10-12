import classNames from 'classnames'
import { FC, HTMLAttributes, memo } from 'react'
import { maybeWithLink } from '../../hoc/maybe-width-link'
import { NGColor } from '../../types/colors'

export enum PriorityStyle {
	h1 = 'font-style--xl',
	h2 = 'font-style--l',
	h3 = 'font-style--m',
	main = 'font-style--giant',
}

export type THeadlineProperties = 1 | 2 | 3
type THeadlineTag = 'h1' | 'h2' | 'h3'

export interface IHeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
	priority?: THeadlineProperties
	priorityStyle?: PriorityStyle
	caps?: boolean
	link?: string
	text?: string | JSX.Element
	textColor?: NGColor
}

export const UnmemoizedHeadline: FC<IHeadlineProps> = (props) => {
	const { priority, className, children, text, textColor, link, priorityStyle, caps, ...attributes } = props
	const HeadlineTag = `h${priority ? priority : 1}` as THeadlineTag

	const headlineColor = `c-hl--${textColor ? textColor : 7}`
	const classes = classNames(className, { 'text--uc': caps }, priorityStyle, headlineColor)

	return (
		<HeadlineTag className={classes} {...attributes}>
			{children}
			{text}
		</HeadlineTag>
	)
}

export const Headline = memo(maybeWithLink(UnmemoizedHeadline))
