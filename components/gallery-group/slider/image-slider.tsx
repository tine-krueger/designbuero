import classNames from 'classnames'
import { CSSProperties, FC, memo, PropsWithChildren } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CustomImage } from '../../custom-image/custom-image'
import styles from './image-slider.module.css'
import { IImageSliderProps } from './image-slider.types'

const UnmemoizedImageSlider: FC<PropsWithChildren<IImageSliderProps>> = (props) => {
	const { images, index = 0 } = props

	const pagination = {
		horizontalClass: styles.pagination,
		clickable: true,
		bulletClass: styles['pagination-bullet'],
		bulletActiveClass: styles['pagination-bullet--active'],
		renderBullet: function (index: number, className: string) {
			return `<span class="${className}"><span></span></span>`
		},
	}

	return (
		<Swiper className={classNames(styles.slider)} slidesPerView={'auto'} centeredSlides={true} watchSlidesProgress={true} slideToClickedSlide={true} modules={[Pagination, Keyboard, Navigation]} pagination={pagination} wrapperTag="div" keyboard={true} initialSlide={index} navigation>
			{images.map((image, index) => {
				return (
					<SwiperSlide
						key={index}
						style={
							{
								aspectRatio: ((image.image.width ?? 1) as number) / ((image.image.height ?? 1) as number),
							} as CSSProperties
						}
						className={classNames(styles.slide)}
					>
						{({ isActive }) => <CustomImage className={classNames(styles.image, { [styles.active]: isActive })} {...image.image} objectFit={'contain'} />}
					</SwiperSlide>
				)
			})}
		</Swiper>
	)
}

export const ImageSlider = memo(UnmemoizedImageSlider)
