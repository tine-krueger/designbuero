import classNames from 'classnames'
import Image, { ImageProps } from 'next/image'
import { FC, memo } from 'react'
import styles from './custom-image.module.css'

export interface ICustomImageProps extends Omit<ImageProps, 'objectFit'> {
	objectFit?: 'cover' | 'contain'
}

export const wordpressLoader = ({ src, width }: any) => {
	const IMAGE_URL = process.env.WP_IMAGE_URL
	return `http://localhost:8888/designbuero_backend/wp-content/uploads/${src}?w=${width}`
}

export const UnmemoizedCustomImage: FC<ICustomImageProps> = (props) => {
	const { className, children, fill = true, alt, objectFit, width, height, style, objectPosition, ...attributes } = props

	const classes = classNames(styles.container, className)
	return (
		<div className={classes}>
			<Image alt={alt || ''} style={{ objectFit, objectPosition }} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} {...attributes} />
		</div>
	)
}

export const CustomImage = memo(UnmemoizedCustomImage)
