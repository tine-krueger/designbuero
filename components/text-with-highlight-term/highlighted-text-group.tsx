import { ComponentProps, FC, memo } from "react"
import { uid } from "react-uid"
import { TextWithHighlightTerm } from "./single/text-with-highlight-term"

export interface IHighlightedTextGroupProps extends ComponentProps<'section'> {
    textGroup: string[]
}
export const UnmemoizedHighlightedTextGroup: FC<IHighlightedTextGroupProps> = (props) => {
    const {className, textGroup, children,  ...attributes } = props

    return (
        <section className={className} {...attributes}>
           {textGroup.map((text, i) => <TextWithHighlightTerm key={uid(text, i)} >{text}</TextWithHighlightTerm>)}
           {children}
        </section>
    )
}

export const HighlightedTextGroup = memo(UnmemoizedHighlightedTextGroup)