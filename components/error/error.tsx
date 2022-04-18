import classNames from "classnames";
import { ComponentProps } from "react";
import { NGColor } from "../../types/colors";
import { Headline, PriorityStyle } from "../headline/headline";
import styles from './error.module.css'

export interface IErrorProps extends ComponentProps<'div'> {
    errorType: string
    errorText: string
}

export function Error(props: IErrorProps) {
    const {className, errorType, errorText, ...rest} = props

    const classes = classNames(styles.container, className, 'm m-v--xxl')
    return (
        <div className= {classes}>
            <Headline priorityStyle={PriorityStyle.h3} textColor={NGColor.grey}>
                {errorType} | {errorText}
            </Headline>
        </div>
    )
}