import classNames from 'classnames'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Button } from '../components/button/button'
import { GalleryWrapper, IPostProps } from '../components/gallery-group/gallery-wrapper'
import { getPortfolioDataByCatId } from '../lib/api'
import styles from '../styles/illustration.module.css'
import { NGColor } from '../types/colors'
import { IWordpressPortfolioProps, mapPortfolioData } from '../util/data-mapping/illustration-data'
import { ICategoryProps } from './kreativ/work'
import { NextPageWithLayout } from './_app'

export interface IIllustrationProps {
	posts: IPostProps[]
	category: ICategoryProps
}

export const getStaticProps: GetStaticProps = async () => {
	const data: IWordpressPortfolioProps = await getPortfolioDataByCatId(2)

	if (null === data) {
		return {
			props: {
				posts: null,
				category: null,
			},
			revalidate: 60,
		}
	}
	const { posts, category } = mapPortfolioData(data)

	return {
		props: {
			posts,
			category,
		},
		revalidate: 60,
	}
}

const Illustration: NextPageWithLayout & NextPage<IIllustrationProps> = ({ posts, category }) => {
	/*TODO: insert view if no post is available*/

	const title = `desingbuero - ${category.name}`
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className={`c-bg--${NGColor.lightgreen}`}>
				{posts && category ? <GalleryWrapper siteTitle={category.name} posts={posts} categoryTexts={category.descriptions} /> : <div>Uuups, No illustrations available at the moment. Please come back later!</div>}
				<div className={classNames(styles.contact, 'grid')}>
					<div className={styles['contact-text-wrapper']}>
						<p className={styles['contact-text']}>
							Schreiben Sie mir unverbindlich, ich berate Sie gern. <br />
							Gemeinsam finden wir die ideale Bildsprache für Ihr Projekt.
						</p>
					</div>

					<Button
						className={classNames(styles['contact-button'], `c-bg--4 c-hili--${NGColor.red}`)}
						layout="round"
						accent="circle"
						as={'link'}
						link={{
							type: 'mail',
							href: 'mailto:ng@desingbuero.de?subject=Anfrage%20Illustration&body=Hallo%20Frau%20Giesler,',
						}}
					>
						Get
						<br />
						in
						<br />
						touch
					</Button>
				</div>
			</main>
		</>
	)
}

export default Illustration

Illustration.headerColor = NGColor.green
Illustration.footerClass = 'c-bg--petrol'
