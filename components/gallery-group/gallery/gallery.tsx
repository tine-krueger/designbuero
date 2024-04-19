import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { ComponentProps, FC, memo, useState } from 'react'
import { uid } from 'react-uid'
import { NGColor } from '../../../types/colors'
import { CustomImage } from '../../custom-image/custom-image'
import { IPostProps } from '../gallery-wrapper'
import { ImageSlider } from '../slider/image-slider'
import styles from './gallery.module.css'

export interface IGalleryProps extends ComponentProps<'div'> {
	images: IPostProps[]
	highlightColor?: NGColor
	texts?: string[]
}

const LightboxComponent = dynamic(() => import('../../lightbox/lightbox'))

const UnmemoizedGallery: FC<IGalleryProps> = (props) => {
	const { className, children, images, highlightColor, texts, ...attributes } = props
	const classes = classNames(className, styles.container, 'grid', { [`c-hili--${highlightColor}`]: highlightColor })
	const [lightboxIsOpen, setLightboxIsOpen] = useState<boolean>(false)
	const [imageToShow, setImagetoShow] = useState<number>(0)

	return (
		<div className={classes} {...attributes}>
			{images.map((image, i) => (
				<div key={uid(image)} className={styles[`image-wrapper`]} onClick={() => handleImageClick(i)}>
					<CustomImage className={styles.image} objectFit={'cover'} sizes={'(min-width: 1280px) 25vw, (min-width: 960px) 33.3vw, (min-width: 768px) 70vw, (min-width: 680px) 50vw , 100vw'} {...image.image} width={undefined} height={undefined} />
				</div>
			))}

			{texts &&
				texts.map((text, i) => {
					return text !== null ? (
						<div key={uid(i)} className={styles[`text-${i + 1}`]}>
							<p>{text}</p>
						</div>
					) : undefined
				})}
			{lightboxIsOpen && imageToShow != undefined && <LightboxComponent setOpen={setLightboxIsOpen} content={<ImageSlider images={images} index={imageToShow} />} />}
		</div>
	)

	function handleImageClick(index: number) {
		console.log('click')
		setLightboxIsOpen(true)
		setImagetoShow(index)
	}
}

export const Gallery = memo(UnmemoizedGallery)
