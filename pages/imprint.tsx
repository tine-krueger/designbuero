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
   

    return {
        props: data.page,
        revalidate: 60
    }
}

const Imprint: NextPageWithLayout & NextPage<IImprintProps> = (props) => {
    const {title, content} = props
    console.log(JSON.stringify(props, null, 2))

    /*TODO: insert view if no post is available*/ 
    return (
        <section className={styles.container}>
            <Headline className={'m m-b--m'}  priority={1} text={title}/>

            <div dangerouslySetInnerHTML={{__html: content}} />

        </section>
        

     
    )
}

export default Imprint

Imprint.headerColor = NGColor.green
Imprint.footerClass = 'c-bg--petrol'