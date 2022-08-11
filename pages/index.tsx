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
import { ImageGridGallery, IMasonryGridGalleryProps } from '../components/gallery-group/masonry-grid/ImageGridGallery'
import styles from '../styles/home.module.css'
import { Headline, IHeadlineProps } from '../components/headline/headline'
import { Button } from '../components/button/button'
import Background from '../public/assets/img/dummys/bg02.jpg'

export const getStaticProps: GetStaticProps = async() => {
  const initialData: IHomeWordpress = await getHomepageData()

  if(null === initialData) {
    return {
      props: {},
      revalidate: 60
    }
  }

  const homeProps: IHomeProps = mapHomeProps(initialData)
  return {
      props: {
          ...homeProps
      },
      revalidate: 60
  }
}

export interface IHomeProps {
  news?: INewsProps | null
  services?: IMasonryGridGalleryProps
  welcome?: IWelcome | null
}

interface IWelcome {
  headline?: IHeadlineProps | null
  text?: string | null
}

const heroProps: IHeroProps = {
  image: <CustomImage src={Background} objectFit={'cover'} sizes={'(max-width: 1600px) 100vw, 1600px'} priority/> ,
  headline: {
    text: 'desiNGbüro'
  },
  subheadline: {
    text: 'Frische Illustrationen . Knackiges Präsentationsdesign . Saubere Grafik . Inspirierende Kreativ-Workshops'
  }
} 

const Home: NextPageWithLayout & NextPage<IHomeProps> = ({news, services, welcome}) => {
  
  return (
  <>
    <Head>
      <title>desiNGbüro - Nadine Giesler</title>
    </Head>
    <main className={classNames('c-bg--8')}>
      <Hero {...heroProps}/>
      
      {services && <ImageGridGallery 
        className={classNames(styles.services, 'm m-b--l m-t--m')} 
        childElementsClasses={{link: styles.link}}
        {...services}
      />}
      {welcome && <>
        <section className={classNames(styles.welcome,'grid')}>
          <div>
            <Headline priority={2} {...welcome.headline}/>
            <p>{welcome.text}</p>
          </div>
          {/* <Button 
            className={classNames(styles.button, 'font-style--highlight')}
            as={'link'}
            link={{
              type: 'internal',
              href: '/about-me'
            }}
            label={'Ich kann nicht anders!'} 
            layout={'round'}
            backgroundColor={NGColor.lightgreen}
            accent={'circle'}
          /> */}
        </section>
      </>}
      {(news || news != null)  && <News {...news}/>}
    </main>
    </>
  )
}

export default Home

Home.footerClass = 'c-bg--blue'
Home.headerColor = NGColor.petrol



