import classNames from 'classnames'
import { AnchorHTMLAttributes, DetailedHTMLProps, FC, memo, useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/media-query-hook'
import Bird from '../../public/assets/svg/bird.svg'
import Flowers from '../../public/assets/svg/flowers.svg'
import Note from '../../public/assets/svg/note.svg'
import { NGColor } from '../../types/colors'
import { ICkHTMLAttributes } from '../../types/types'
import { CustomImage, ICustomImageProps } from '../custom-image/custom-image'
import { Headline, IHeadlineProps } from '../headline/headline'
import styles from './news.module.css'



export interface INewsProps extends ICkHTMLAttributes<HTMLElement> {
	image?: ICustomImageProps | null
	headline?: IHeadlineProps
	content?: string | null | undefined
	link?:
		| (DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
				label: string
		  })
		| null
}

const UnmemoizedNews: FC<INewsProps> = (props) => {
	const { className, children, headline, link, content, image, ...attributes } = props
	const isBreakpoint = useMediaQuery(768)
	const isUnderContentWidthMax = useMediaQuery(1140)
	const birdRef = useRef<HTMLDivElement | null>(null)

	const classes = classNames(className, styles.container, 'grid content-width')

	useEffect(() => {
		if (!birdRef.current) return
		const cachedBirdRef = birdRef.current
		const observer = new IntersectionObserver(
			(entrie) => {
				cachedBirdRef.classList.toggle('fly', entrie[0].isIntersecting)
			},
			{ threshold: 1 }
		)

		observer.observe(cachedBirdRef)
		return () => observer.unobserve(cachedBirdRef)
	}, [birdRef])

	return (
		<section className={classNames(styles.section, 'm m-v--l')} {...attributes}>
			<div className={classes}>
				<div className={styles.image}>{image && <CustomImage className={classNames(styles['image-wrapper'])} objectFit={'contain'} fill={false} {...image} />}</div>

				<div className={styles['content-wrapper']}>
					<Headline {...headline} textColor={NGColor.blue} priority={2} />
					<p>{content != null && content}</p>
					{(link || link != null) && <a {...link}>{link.label}</a>}
				</div>
			</div>
			{!isBreakpoint && (
				<div className={classNames(styles.bird, 'grid')} ref={birdRef}>
					<Note className={styles.note} />
					<Bird></Bird>
				</div>
			)}

			{!isUnderContentWidthMax && (
				<div className={classNames(styles.flowers)}>
					<Flowers />
				</div>
			)}
		</section>
	)
}

export const News = memo(UnmemoizedNews)
