import { GetStaticProps, NextPage } from "next"
import { Headline } from "../components/headline/headline"
import { getPageData } from "../lib/api"
import { NGColor } from "../types/colors"
import { NextPageWithLayout } from "./_app"
import styles from '../styles/page.module.css'

export interface IImprintProps {
    title: string
    content: string
}

export const getStaticProps: GetStaticProps = async() => {
    const data = await getPageData(497)
   
    if (data === null) {
        return {
            props: {
                title: null,
                content: null
            }
        }
    }

    return {
        props: data.page,
        revalidate: 60
    }
}

const Imprint: NextPageWithLayout & NextPage<IImprintProps> = (props) => {
    const {title, content} = props
   
    return (
        <section className={styles.container}>
            {title != null && <Headline className={'m m-b--m'}  priority={1} text={title}/>}

            {content != null ? <div dangerouslySetInnerHTML={{__html: content}}  /> 
            :<p>Uups, keine Verbindung zur Datenbank. Hier muss der Administrator ran!</p>}

        </section>
        

     
    )
}

export default Imprint

Imprint.headerColor = NGColor.green
Imprint.footerClass = 'c-bg--petrol'