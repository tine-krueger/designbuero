import classNames from "classnames";
import { ComponentProps, CSSProperties, FC, memo } from "react";
import styles from './gallery.module.css'
import { CustomImage, ICustomImageProps } from '../custom-image/custom-image'
import { uid } from "react-uid";
import { NGColor } from "../../types/colors";

export interface IGalleryProps extends ComponentProps<'div'> {
    images: ICustomImageProps[]
    highlightColor?: NGColor

}

const clipPath: CSSProperties[] = [
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
    {"--clip-start": "ellipse(0 0 at 0 0)", "--clip-end": "ellipse(150% 150% at 0 0)" } as CSSProperties,
]

const UnmemoizedGallery: FC<IGalleryProps> = (props) => {
    const {className, children, images, highlightColor,  ...attributes} = props
    const classes = classNames(className, styles.container,  'grid', {[`c-hili--${highlightColor}`]  : highlightColor})
    return (
        <div className={classes} {...attributes}>
            {images.map( (image, i) => (
                <div key={uid(image)} className={styles[`image-wrapper`]}>
                    <CustomImage className={styles.image} {...image} />
                </div>
            ))}
        </div>
    )
}

export const Gallery = memo(UnmemoizedGallery)