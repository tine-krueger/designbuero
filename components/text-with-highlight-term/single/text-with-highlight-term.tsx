import classNames from "classnames"
import parse from 'html-react-parser';
import { ComponentProps, FC, memo } from "react"
import styles from './text-with-highlight-term.module.css'

export interface IHightlightTermTextProps extends ComponentProps<'div'> {
    children: string 
}

export const UnmemoizedTextWithHighlightTerm: FC<IHightlightTermTextProps> = (props) => {
    const {className, children, ...attributes} = props

    const classes = classNames(styles.container, className )
    return (
        <div className={classes} {...attributes}>
            {parse(children)}
        </div>
    )
}

export const TextWithHighlightTerm = memo(UnmemoizedTextWithHighlightTerm)