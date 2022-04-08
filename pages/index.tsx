import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import classNames from 'classnames/bind'
import { getHomepageData } from '../lib/api'
import { INewsProps, News } from '../components/news/news'
import { Hero, IHeroProps } from '../components/hero/hero'
import { NextPageWithLayout } from './_app'
import { NGColor } from '../types/colors'
import { CustomImage } from '../components/custom-image/custom-image'
import { useEffect, useState } from 'react'

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

const heroProps: IHeroProps = {
  image: <CustomImage src={'/assets/img/dummys/bg02.jpg'} objectFit={'cover'} priority/> ,
  headline: {
    text: 'desiNGbüro'
  },
  subheadline: {
    text: 'Fine illustrations, neat graphics... \n Exploring creativity.'
  }
} 

const Home: NextPageWithLayout & NextPage<IHomeProps> = ({initialData}) => {

  const [ news, setNews] =  useState<any | undefined>(undefined)

  useEffect(() => {
    if (initialData === null) {
      return
    }
    setNews(initialData.nodes[0])
  }, [initialData])

  return (
  <>
    <Head>
      <title>DesiNGbüro - Nadine Giesler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={classNames('c-bg--8')}>
      <Hero {...heroProps}/>
    
     {news && <News 
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
      
      ></News>}
    </div>
    </>
  )
}

export default Home

Home.footerClass = 'c-bg--blue'
Home.headerColor = NGColor.petrol



