import classNames from "classnames"
import { FC, memo } from "react"
import { CustomImage, ICustomImageProps } from "../../custom-image/custom-image"
import styles from './lightbox-image.module.css'

export interface ILightboxImageProps extends ICustomImageProps{}

export const UnmemoizedLightboxImage: FC<ILightboxImageProps> = (props) => {
    const {className, children, ...attributes} = props
    const classes = classNames(className, styles.container)
    console.log(attributes)
    return(
        <CustomImage className={classes} {...attributes} sizes={'(min-width: 1200px) 1140px, 80vw'} objectFit={'contain'}/>
    )
}

export const LightboxImage = memo(UnmemoizedLightboxImage)