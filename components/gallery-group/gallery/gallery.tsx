import classNames from "classnames";
import { ComponentProps, CSSProperties, FC, memo, useState } from "react";
import styles from './gallery.module.css'
import { CustomImage, ICustomImageProps } from '../../custom-image/custom-image'
import { uid } from "react-uid";
import { NGColor } from "../../../types/colors";
// import { Lightbox } from "../../lightbox/lightbox";
import { LightboxImage } from "../../lightbox/lightbox-image/lightbox-image";
import { IPostProps } from "../gallery-wrapper";
import dynamic from "next/dynamic";

export interface IGalleryProps extends ComponentProps<'div'> {
    images: IPostProps[]
    highlightColor?: NGColor
    texts?: string[]
}

const LightboxComponent = dynamic(() => import('../../lightbox/lightbox'));

const UnmemoizedGallery: FC<IGalleryProps> = (props) => {
    const {className, children, images, highlightColor, texts,  ...attributes} = props
    const classes = classNames(className, styles.container,  'grid', {[`c-hili--${highlightColor}`]  : highlightColor})
    const [lightboxIsOpen, setLightboxIsOpen] = useState<boolean>(false)
    const [imageToShow, setImagetoShow] =useState<ICustomImageProps | undefined>()
    console.log(texts)
    return (
        <div className={classes} {...attributes}>
            {images.map( (image, i) => (
                    <div key={uid(image)} className={styles[`image-wrapper`]} onClick={() => handleImageClick(image.image)}>
                        <CustomImage className={styles.image} objectFit={'cover'} sizes={'(min-width: 1200px) 25vw, (min-width: 940px) 33.3vw, (min-width: 768px) 70vw,  100vw'} {...image.image} />
                    </div>
            ))}
            {texts && texts.map( (text, i) => 
               {return text !==  null ?  (<div key={uid(i)} className={styles[`text-${i + 1}`]}>
                    <p>{text}</p>
                </div> ) : undefined }  
            )}
            {lightboxIsOpen && imageToShow && <LightboxComponent setOpen={setLightboxIsOpen} content={<LightboxImage {...imageToShow}/>}/>}
        </div>
    )

    function handleImageClick(image: ICustomImageProps) {
        setLightboxIsOpen(true)
        setImagetoShow(image)
    }
}

export const Gallery = memo(UnmemoizedGallery)