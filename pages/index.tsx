import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import classNames from 'classnames/bind'

import { getHomepageData } from '../lib/api'
import { News } from '../components/news/news'
import Link from 'next/link'



export const getStaticProps: GetStaticProps = async() => {
  const initialData = await getHomepageData()
  return {
      props: {
          initialData
      }
  }
}

export interface IHomeProps {
  initialData: any
}

const Home: NextPage<IHomeProps> = ({initialData}) => {
  console.log(initialData.nodes)
  const data = initialData.nodes
  const news = data[0]
  return (
  <>
    <Head>
      <title>DesiNGbüro - Nadine Giesler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={classNames(styles.container, 'c-bg--8')}>
      <Link href="/illustration">
        <a>Illustration</a>
      </Link>
    
      <News 
        headline={{
          text: news.title
        }}
        content={news.postsadditionals.customexcerpt}
        image={
          {
            src: news.featuredImage.node.sourceUrl,
          }
        }
        link={{
          href: '#',
          label: 'Weiterlesen'
        }}
      
      ></News>
    </div>
    </>
  )
}

export default Home





