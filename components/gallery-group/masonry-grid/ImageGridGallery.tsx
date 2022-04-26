import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { ComponentProps, FC, memo } from 'react'
import { uid } from 'react-uid'
import { NGColor } from '../../../types/colors'
import { CustomImage, ICustomImageProps } from '../../custom-image/custom-image'
import styles from './image-grid-gallery.module.css'

export type TMasonryGridClasses = {
   image?: string
   link?: string
}

interface IGalleryImage extends ICustomImageProps {
    link?: LinkProps
    hoverOverlay?: string | JSX.Element
}

export interface IMasonryGridGalleryProps extends ComponentProps<'div'> {
    images: IGalleryImage[]
    imagesHavePriority?: boolean
    
}

interface IInternalMasonryGridGalleryProps {
    childElementsClasses?: TMasonryGridClasses
    objectFit?: 'cover' | 'contain'
}

const UnmemoizedImageGridGallery: FC<IMasonryGridGalleryProps & IInternalMasonryGridGalleryProps> = (props) => {
    const {className, children, images,  childElementsClasses, objectFit = 'cover', imagesHavePriority, ...attributes} = props
    const classes = classNames(className, styles.conatiner, 'grid')
    return (
        <div className={classes} {...attributes}>
                {images.map( image => {
                    const {link, hoverOverlay, ...rest} = image
                    return link ? (
                                <Link key={uid(image)} href={link.href}>
                                    <a className={classNames(styles.link, childElementsClasses?.link, 'no-link')}>
                                        <CustomImage 
                                            
                                            className={classNames(styles.image, childElementsClasses?.image)} 
                                            objectFit={objectFit} 
                                            priority={imagesHavePriority} 
                                            {...rest}
                                        />
                                        {hoverOverlay && <div className={styles.overlay}>
                                            <div className={styles['snippet-wrapper']}>
                                                <p className={classNames(styles.snippet, `c-t--${NGColor.white}`, 'font-style--l')}>
                                                    {hoverOverlay}
                                                </p>

                                            </div>
                                        </div>}
                                    </a>
                                </Link>
                            ): (
                                <CustomImage 
                                    key={uid(image)} 
                                    className={classNames(styles.image, childElementsClasses?.image)} 
                                    objectFit={objectFit} 
                                    priority={imagesHavePriority} 
                                    {...rest}
                                />
                            )
                        
                })}
                {children}
        </div>
    )
}

export const ImageGridGallery = memo(UnmemoizedImageGridGallery)