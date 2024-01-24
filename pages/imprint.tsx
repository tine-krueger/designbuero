import { TypedObject } from '@portabletext/types'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Headline } from '../components/headline/headline'
import { PortableBody } from '../components/portable-body/portable-body'
import { getPageData } from '../lib/api'
import styles from '../styles/page.module.css'
import { NGColor } from '../types/colors'
import { htmlStringToPortableText } from '../util/html-string-to-portable-text'
import { NextPageWithLayout } from './_app'

export interface IImprintProps {
	title: string
	content: TypedObject | TypedObject[]
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getPageData(497)

	if (data === null) {
		return {
			props: {
				title: null,
				content: null,
			},
		}
	}

	const portableText = htmlStringToPortableText(data.page.content)

	return {
		props: { ...data.page, content: portableText },
		revalidate: 60,
	}
}

const Imprint: NextPageWithLayout & NextPage<IImprintProps> = (props) => {
	const { title, content } = props
	const newTitle = `desingbuero - ${title}`
	return (
		<>
			<Head>
				<title>{newTitle}</title>
			</Head>
			<main>
				<section className={styles.container}>
					{title != null && <Headline className={'m m-b--m'} priority={1} text={title} />}

					{content != null ? (
						<div>
							<PortableBody value={content} />
						</div>
					) : (
						<p>Uups, keine Verbindung zur Datenbank. Hier muss der Administrator ran!</p>
					)}
				</section>
			</main>
		</>
	)
}

export default Imprint

Imprint.headerColor = NGColor.green
Imprint.footerClass = 'c-bg--petrol'
