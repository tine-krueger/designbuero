import classNames from 'classnames'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Button } from '../components/button/button'
import { CustomImage, ICustomImageProps } from '../components/custom-image/custom-image'
import { ImageGridGallery, TMasonryGridClasses } from '../components/gallery-group/masonry-grid/ImageGridGallery'
import { Headline, PriorityStyle } from '../components/headline/headline'
import { Hero } from '../components/hero/hero'
import { IImageTextProps, ImageText } from '../components/image-text/single-image-text/image-text'
import { ITestimonialProps } from '../components/testimonials/testimonial/testimonial'
import { Testimonials } from '../components/testimonials/testimonials'
import { HighlightedTextGroup } from '../components/text-with-highlight-term/highlighted-text-group'
import { useMediaQuery } from '../hooks/media-query-hook'
import { getKreativData } from '../lib/api'
import heroImage from '../public/assets/img/kreativ_hero.jpg'
import Einstein from '../public/assets/svg/einstein.svg'
import Zweig from '../public/assets/svg/twig.svg'
import styles from '../styles/kreativ.module.css'
import { NGColor } from '../types/colors'

import { WorkshopProps } from '../components/workshops/workshop/workshop.types'
import Workshops from '../components/workshops/workshops'
import { kreativData } from '../util/data-mapping/kreative-data'
import { NextPageWithLayout } from './_app'

export interface IKreativProps {
	testimonials?: ITestimonialProps[]
	images?: ICustomImageProps[] | null
	textGroup?: string[]
	title?: string
	imageText?: IImageTextProps
	workshops?: WorkshopProps[]
}

export const getStaticProps: GetStaticProps = async () => {
	const page = await getKreativData()

	if (page === null) {
		return {
			props: {},
			revalidate: 60,
		}
	}

	const data = kreativData(page)

	return {
		props: {
			...data,
		},
		revalidate: 60,
	}
}

const Kreativ: NextPageWithLayout & NextPage<IKreativProps> = (props) => {
	const { testimonials, images, textGroup, title, imageText, workshops, ...rest } = props

	const gridChildClasses: TMasonryGridClasses = {
		image: classNames(styles.image),
	}

	const isBreakpoint = useMediaQuery(768)
	const newTitle = `desingbuero - ${title}`
	return (
		<>
			<Head>
				<title>{newTitle}</title>
			</Head>
			<main>
				<Hero
					image={<CustomImage src={heroImage} alt={'Hero Background Paint'} objectFit={'cover'} priority objectPosition={'top'} />}
					content={<Einstein />}
					disrupter={
						workshops && workshops?.length > 0 ? (
							<Button
								className={classNames(styles['get-in-touch'], 'font-style--highlight')}
								layout={'round'}
								backgroundColor={NGColor.yellow}
								blobColor={NGColor.green}
								as={'link'}
								link={{
									type: 'external',
									href: '/kreativ#workshops',
								}}
							>
								Gönn <br /> dir deine <br /> kreative <br /> Auszeit!
							</Button>
						) : undefined
					}
					layout="layout-2"
				/>

				{imageText && (
					<ImageText
						className={classNames(styles['image-text'], 'm m-t p p-v')}
						childElementsClasses={{
							image: styles.image,
							content: styles.content,
						}}
						image={!isBreakpoint ? imageText.image : null}
						text={
							<>
								<Headline priority={2} priorityStyle={PriorityStyle.h1} text={title} />
								<p>{imageText.text}</p>
							</>
						}
					/>
				)}

				{images && (
					<ImageGridGallery className={styles['image-grid']} childElementsClasses={gridChildClasses} images={isBreakpoint ? [images[0]] : images} objectFit={'cover'}>
						<Button
							className={classNames(styles['show-all'], 'font-style--highlight')}
							backgroundColor={NGColor.yellow}
							blobColor={NGColor.green}
							layout={'round'}
							accent={'circle'}
							as={'link'}
							link={{
								type: 'internal',
								href: '/kreativ/work',
							}}
						>
							Show <br />
							All
						</Button>
					</ImageGridGallery>
				)}

				{textGroup && (
					<section className={styles['text-group-wrapper']}>
						<HighlightedTextGroup className={styles['text-group']} textGroup={textGroup}>
							<Button
								className={classNames(styles['get-in-touch'], 'font-style--highlight')}
								layout={'round'}
								backgroundColor={NGColor.petrol}
								blobColor={NGColor.green}
								as={'link'}
								link={{
									type: 'mail',
									href: 'mailto:ng@desingbuero.de?subject=Anfrage%20Kreativ&body=Hallo%20Frau%20Giesler,',
								}}
							>
								Get in <br /> touch!
							</Button>
						</HighlightedTextGroup>

						<Workshops id={'workshops'} className={styles.workshops} workshops={workshops} />
						<Zweig className={classNames(styles.zweig, 'visible-s')} />
					</section>
				)}

				{testimonials && <Testimonials className={classNames('m m-t')} headline={{ text: 'Teilnehmer-\nfeedback' }} layout={'creative'} testimonials={testimonials} />}
			</main>
		</>
	)
}

export default Kreativ

Kreativ.headerColor = NGColor.grey
Kreativ.footerClass = `c-bg--${NGColor.green}`
