import classNames from 'classnames'
import { ComponentProps, FC, memo } from 'react'
import { uid } from 'react-uid'
import { CustomImage, ICustomImageProps } from '../../custom-image/custom-image'
import styles from './masonry-grid.module.css'

export type TMasonryGridClasses = {
   image?: string
}

export interface IMasonryGridGalleryProps extends ComponentProps<'div'> {
    images: ICustomImageProps[]
    imagesHavePriority?: boolean
}

interface IInternalMasonryGridGalleryProps {
    childElementsClasses?: TMasonryGridClasses
    objectFit?: 'cover' | 'contain'
}

const UnmemoizedImageGridGallery: FC<IMasonryGridGalleryProps & IInternalMasonryGridGalleryProps> = (props) => {
    const {className, children, images,  childElementsClasses, objectFit, imagesHavePriority, ...attributes} = props
    const classes = classNames(className, styles.conatiner, 'grid')
    return (
        <div className={classes} {...attributes}>
                {images.map( image => {
                    return (
                        <CustomImage key={uid(image)} className={classNames(styles.image, childElementsClasses?.image)} objectFit={objectFit} priority={imagesHavePriority} {...image}/>
                    )
                })}
                {children}
        </div>
    )
}

export const ImageGridGallery = memo(UnmemoizedImageGridGallery)