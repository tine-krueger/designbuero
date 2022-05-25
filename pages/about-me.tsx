import { GetStaticProps, NextPage } from "next"
import { IImageTextProps, ImageText } from "../components/image-text/single-image-text/image-text"
import { NGColor } from "../types/colors"
import { NextPageWithLayout } from "./_app"
import styles from '../styles/about-me.module.css'
import classNames from "classnames"
import { getAboutMeData } from "../lib/api"
import { getAboutMeProps, IAboutMeWordpress } from "../util/data-mapping/about-me-data"
import { Headline } from "../components/headline/headline"
import { uid } from "react-uid"
import parse from 'html-react-parser'

export interface IAboutMeProps { 
    content: IImageTextProps[]
    headline: string
}

export const getStaticProps: GetStaticProps = async() => {
   const data: IAboutMeWordpress =  await getAboutMeData()
   
   if(data === null) {
    return {
        props: {
            content: null
        }
    }

   }

   const page: IAboutMeProps = getAboutMeProps(data)

   return {
       props: {
           ...page
       },
       revalidate: 60
   }
}
 
const AboutMe: NextPageWithLayout & NextPage<IAboutMeProps> = (props) => {
    const { content, headline } = props
    
    console.log(JSON.stringify(props, null, 2))
   
    return (
        <main className={styles.container}>  
            <Headline className={styles.headline} text={headline}/>
            <div className={classNames(styles['image-text-wrapper'])}>
                {content && content.map( item => (
                    <ImageText 
                        key={uid(item)}
                        className={classNames(styles['image-text'])} 
                        childElementsClasses={{
                            image: classNames(styles.image),
                            content: classNames(styles.text)
                        }}
                        image={item.image}
                        text={<>{parse(item.text as string)}</>}
                    />
                ))}
            </div>
        </main>
    )
}

export default AboutMe

AboutMe.headerColor = NGColor.brown
AboutMe.footerClass = `c-bg--${NGColor.red}`