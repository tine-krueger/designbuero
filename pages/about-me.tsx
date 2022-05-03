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

export interface IAboutMeProps { 
    content: IImageTextProps[]
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
    const { content } = props
    
    // console.log(JSON.stringify(content, null, 2))
   
    return (
        <main>  
            <Headline className={styles.headline} text={'Hallo,'}/>
            <div className={classNames(styles['image-text-wrapper'])}>
                {content && content.map( item => (
                    <ImageText 
                        key={uid(item)}
                        className={classNames(styles['image-text'])} 
                        childElementsClasses={{
                            image: classNames(styles.image),
                            content: classNames(styles.text)
                        }}
                        {...item}
                    />
                ))}
            </div>
        </main>
    )
}

export default AboutMe

AboutMe.headerColor = NGColor.brown
AboutMe.footerClass = `c-bg--${NGColor.red}`