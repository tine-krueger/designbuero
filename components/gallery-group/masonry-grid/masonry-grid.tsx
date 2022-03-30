import classNames from 'classnames'
import { ComponentProps, FC, memo } from 'react'
import { uid } from 'react-uid'
import { CustomImage, ICustomImageProps } from '../../custom-image/custom-image'
import styles from './masonry-grid.module.css'

export type TMasonryGridClasses = {
    leftGrid?: string
    rightGrid?: string
}

export interface IMasonryGridGalleryProps extends ComponentProps<'div'> {
    leftGrid: ICustomImageProps[]
    rightGrid: ICustomImageProps[]
}

interface IInternalMasonryGridGalleryProps {
    childElementsClasses?: TMasonryGridClasses
    objectFit?: 'cover' | 'contain'
}

const UnmemoizedMasonryGridGallery: FC<IMasonryGridGalleryProps & IInternalMasonryGridGalleryProps> = (props) => {
    const {className, children, leftGrid, rightGrid, childElementsClasses, objectFit, ...attributes} = props
    const classes = classNames(className, styles.conatiner, 'grid')
    return (
        <div className={classes} {...attributes}>
            <div className={classNames(childElementsClasses?.leftGrid, styles['left-grid'], 'grid')}>
                {leftGrid.map( image => {
                    return (
                        <CustomImage key={uid(image)} className={styles.image} objectFit={objectFit} {...image}/>
                    )
                })}
            </div>
            <div className={classNames(childElementsClasses?.rightGrid, styles['right-grid'], 'grid')}>
                {rightGrid.map( image => (
                    <CustomImage key={uid(image)} className={styles.image} objectFit={objectFit} {...image}/>
                )) }
            </div>
        </div>
    )
}

export const MasonryGridGallery = memo(UnmemoizedMasonryGridGallery)