import classNames from "classnames";
import { ComponentProps, FC, memo } from "react";
import { CustomImage, ICustomImageProps } from "../../custom-image/custom-image";
import styles from './image-text.module.css'

export type TImageTextClasses = {
    image?: string
    content?: string
}

export interface IImageTextProps extends ComponentProps<'div'> {
    image: ICustomImageProps | null
    text: string | JSX.Element
}

export interface IInternalImageProps {
    childElementsClasses?: TImageTextClasses
}

export const UnmemoizedImageText: FC<IImageTextProps & IInternalImageProps> = (props) => {
    const {className, image, text, childElementsClasses, ...attributes} = props

    const classes = classNames(styles.container, className, 'grid')
    return (
        <div className={classes}>
            {image && <CustomImage className={classNames(styles.image, childElementsClasses?.image)} objectFit='cover' {...image}/>}
            <div className={classNames(styles.content, childElementsClasses?.content)}>
                {text}
            </div>
        </div>
    )
}

export const ImageText = memo(UnmemoizedImageText)