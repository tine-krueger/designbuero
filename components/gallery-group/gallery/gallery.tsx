import classNames from "classnames";
import { ComponentProps, CSSProperties, FC, memo, useState } from "react";
import styles from './gallery.module.css'
import { CustomImage, ICustomImageProps } from '../../custom-image/custom-image'
import { uid } from "react-uid";
import { NGColor } from "../../../types/colors";
import { Lightbox } from "../../lightbox/lightbox";
import { LightboxImage } from "../../lightbox/lightbox-image/lightbox-image";
import { IPostProps } from "../gallery-wrapper";

export interface IGalleryProps extends ComponentProps<'div'> {
    images: IPostProps[]
    highlightColor?: NGColor
}

const UnmemoizedGallery: FC<IGalleryProps> = (props) => {
    const {className, children, images, highlightColor,  ...attributes} = props
    const classes = classNames(className, styles.container,  'grid', {[`c-hili--${highlightColor}`]  : highlightColor})
    const [lightboxIsOpen, setLightboxIsOpen] = useState<boolean>(false)
    const [imageToShow, setImagetoShow] =useState<ICustomImageProps | undefined>()

    return (
        <div className={classes} {...attributes}>
            {images.map( (image, i) => (
                    <div key={uid(image)} className={styles[`image-wrapper`]} onClick={() => handleImageClick(image.image)}>
                        <CustomImage className={styles.image} objectFit={'cover'} sizes={'(min-width: 1200px) 25vw, (min-width: 940px) 33.3vw, (min-width: 768px) 70vw,  100vw'} {...image.image} />
                    </div>
            ))}
            <div className={styles['text-1']}>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
            </div>
            <div className={styles['text-2']}>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
            </div>

            {lightboxIsOpen && imageToShow && <Lightbox setOpen={setLightboxIsOpen} content={<LightboxImage {...imageToShow}/>}/>}
        </div>
    )

    function handleImageClick(image: ICustomImageProps) {
        setLightboxIsOpen(true)
        setImagetoShow(image)
    }
}

export const Gallery = memo(UnmemoizedGallery)