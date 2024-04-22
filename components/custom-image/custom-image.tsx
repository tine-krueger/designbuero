import classNames from 'classnames'
import Image, { ImageProps } from 'next/image'
import { FC, memo } from 'react'
import styles from './custom-image.module.css'

export interface ICustomImageProps extends Omit<ImageProps, 'objectFit'> {
	objectFit?: 'cover' | 'contain'
}

export const UnmemoizedCustomImage: FC<ICustomImageProps> = (props) => {
	const { className, children, fill = true, alt, objectFit, objectPosition, width, height, style, ...attributes } = props

	const classes = classNames(styles.container, className)
	return (
		<div className={classes}>
			<Image alt={alt || ''} style={{ objectFit }} sizes={'(min-width: 768px) 70vw, (min-width: 680px) 50vw , 100vw'} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} {...attributes} />
		</div>
	)
}

export const CustomImage = memo(UnmemoizedCustomImage)
