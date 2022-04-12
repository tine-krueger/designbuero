import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import classNames from 'classnames/bind'
import { getHomepageData } from '../lib/api'
import { INewsProps, News } from '../components/news/news'
import { Hero, IHeroProps } from '../components/hero/hero'
import { NextPageWithLayout } from './_app'
import { NGColor } from '../types/colors'
import { CustomImage } from '../components/custom-image/custom-image'
import { IHomeWordpress, mapHomeProps } from '../util/data-mapping/homepage-data'
import { ImageGridGallery, IMasonryGridGalleryProps } from '../components/gallery-group/masonry-grid/masonry-grid'
import styles from '../styles/home.module.css'
import { Headline, IHeadlineProps } from '../components/headline/headline'
import { Button } from '../components/button/button'

export const getStaticProps: GetStaticProps = async() => {
  const initialData: IHomeWordpress = await getHomepageData()
  const homeProps: IHomeProps = mapHomeProps(initialData)
  return {
      props: {
          ...homeProps
      }
  }
}

export interface IHomeProps {
  news?: INewsProps
  services?: IMasonryGridGalleryProps
  welcome?: IWelcome
}

interface IWelcome {
  headline?: IHeadlineProps
  text?: string
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

const Home: NextPageWithLayout & NextPage<IHomeProps> = ({news, services, welcome}) => {
  //  console.log(JSON.stringify(rest, null, 2))
  
  return (
  <>
    <Head>
      <title>DesiNGbüro - Nadine Giesler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={classNames('c-bg--8')}>
      <Hero {...heroProps}/>
      
      {services && <ImageGridGallery className={classNames(styles.services, 'm m-v--l')} {...services}/>}
      {welcome && <>
        <section className={classNames(styles.welcome,'grid')}>
          <div>
            <Headline priority={2} {...welcome.headline}/>
            <p>{welcome.text}</p>
          </div>
          <Button 
            className={classNames(styles.button, 'font-style--highlight-2')}
            as={'link'}
            href={'/about-me'}
            label={'Ich kann nicht anders!'} 
            layout={'round'}
            backgroundColor={NGColor.lightgreen}
            accent={'circle'}
          />
        </section>
      </>}
      {news && <News {...news}/>}
    </div>
    </>
  )
}

export default Home

Home.footerClass = 'c-bg--blue'
Home.headerColor = NGColor.petrol



