import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Headline } from '../components/headline/headline'
import { getPageData } from '../lib/api'
import styles from '../styles/page.module.css'
import { NGColor } from '../types/colors'
import { NextPageWithLayout } from './_app'

export interface IPrivacyProps {
	title?: string
	content?: string
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getPageData(501)

	if (data === null) {
		return {
			props: {
				title: undefined,
				content: undefined,
			},
		}
	}

	return {
		props: data.page,
		revalidate: 60,
	}
}

const Privacy: NextPageWithLayout & NextPage<IPrivacyProps> = (props) => {
	const { title, content } = props

	/*TODO: insert view if no post is available*/
	return (
		<>
			<Head>
				<title>desingbüro - {title}</title>
			</Head>
			<main>
				<section className={styles.container}>
					{title && <Headline className={'m m-b--m'} priority={1} text={title} />}

					{content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : <p>Uups, keine Verbindung zur Datenbank. Hier muss der Administrator ran!</p>}
				</section>
			</main>
		</>
	)
}

export default Privacy

Privacy.headerColor = NGColor.green
Privacy.footerClass = 'c-bg--petrol'
