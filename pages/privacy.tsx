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

export interface IPrivacyProps {
	title?: string
	content?: TypedObject | TypedObject[]
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

	const portableText = htmlStringToPortableText(data.page.content)

	return {
		props: { ...data.page, content: portableText },
		revalidate: 60,
	}
}

const Privacy: NextPageWithLayout & NextPage<IPrivacyProps> = (props) => {
	const { title, content } = props

	/*TODO: insert view if no post is available*/

	const newTitle = `desingbuero - ${title}`
	return (
		<>
			<Head>
				<title>{newTitle}</title>
			</Head>
			<main>
				<section className={styles.container}>
					{title && <Headline className={'m m-b--m'} priority={1} text={title} />}

					{content ? (
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

export default Privacy

Privacy.headerColor = NGColor.green
Privacy.footerClass = 'c-bg--petrol'
