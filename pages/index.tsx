import classNames from 'classnames'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Button } from '../components/button/button'
import { CustomImage } from '../components/custom-image/custom-image'
import { IMasonryGridGalleryProps, ImageGridGallery } from '../components/gallery-group/masonry-grid/ImageGridGallery'
import { Headline, IHeadlineProps } from '../components/headline/headline'
import { Hero, IHeroProps } from '../components/hero/hero'
import { INewsProps, News } from '../components/news/news'
import { getHomepageData } from '../lib/api'
import Background from '../public/assets/img/dummys/bg02.jpg'
import styles from '../styles/home.module.css'
import { NGColor } from '../types/colors'
import { IHomeWordpress, mapHomeProps } from '../util/data-mapping/homepage-data'
import { NextPageWithLayout } from './_app'

export const getStaticProps: GetStaticProps = async () => {
	const initialData: IHomeWordpress = await getHomepageData()

	if (null === initialData) {
		return {
			props: {},
			revalidate: 60,
		}
	}

	const homeProps: IHomeProps = mapHomeProps(initialData)

	return {
		props: {
			...homeProps,
		},
		revalidate: 60,
	}
}

export interface IHomeProps {
	news?: INewsProps | null
	services?: IMasonryGridGalleryProps
	welcome?: IWelcome | null
	workshop?: any | null
}

interface IWelcome {
	headline?: IHeadlineProps | null
	text?: string | null
}

const heroProps: IHeroProps = {
	image: <CustomImage className={styles['hero-image']} src={Background} alt={'Hero Background Pattern'} objectFit={'cover'} sizes={'(max-width: 1600px) 100vw, 1600px'} priority />,
	headline: {
		text: 'desiNGbüro',
	},
	subheadline: {
		text: (
			<>
				Frische <b>Illustrationen </b>. Knackiges <b>Präsentationsdesign</b> . Saubere <b>Grafik</b> . Inspirierende <b>Kreativ-Workshops</b>
			</>
		),
	},
}

const Home: NextPageWithLayout & NextPage<IHomeProps> = ({ news, services, welcome, workshop }) => {
	return (
		<>
			<Head>
				<title>desiNGbüro - Nadine Giesler</title>
			</Head>
			<main className={classNames('c-bg--8')}>
				<Hero
					disrupter={
						workshop ? (
							<Button
								className={classNames(styles['workshops'], 'font-style--highlight')}
								layout={'round'}
								backgroundColor={NGColor.yellow}
								blobColor={NGColor.green}
								as={'link'}
								link={{
									type: 'external',
									href: '/kreativ#workshops',
								}}
							>
								Hier <br /> entlang <br />
								zu den
								<br /> Work- <br /> shops!
							</Button>
						) : undefined
					}
					{...heroProps}
				/>

				{services && <ImageGridGallery className={classNames(styles.services, 'm m-b--l m-t--m')} childElementsClasses={{ link: styles.link }} {...services} />}
				{welcome && (
					<>
						<section className={classNames(styles.welcome, 'grid')}>
							<div>
								<Headline priority={2} {...welcome.headline} />
								<p>{welcome.text}</p>
							</div>
						</section>
					</>
				)}
				{(news || news != null) && <News {...news} />}
			</main>
		</>
	)
}

export default Home

Home.footerClass = 'c-bg--blue'
Home.headerColor = NGColor.petrol
