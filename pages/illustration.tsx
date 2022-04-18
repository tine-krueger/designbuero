import { GetStaticProps, NextPage } from "next"
import { ICustomImageProps } from "../components/custom-image/custom-image"
import { GalleryWrapper, IPostProps } from "../components/gallery-group/gallery-wrapper"
import { Gallery } from "../components/gallery-group/gallery/gallery"
import { getPortfolioDataByCatId } from "../lib/api"
import { NGColor } from "../types/colors"
import { IWordpressPortfolioProps, mapPortfolioData } from "../util/data-mapping/illustration-data"
import { NextPageWithLayout } from "./_app"
import styles from '../styles/illustration.module.css'
import { Button } from "../components/button/button"
import classNames from "classnames"
import { ICategoryProps } from "./kreativ/work"

export interface IIllustrationProps {
    posts: IPostProps[]
    category: ICategoryProps
}

export const getStaticProps: GetStaticProps = async() => {
    const data: IWordpressPortfolioProps = await getPortfolioDataByCatId(2)

    if (null === data ) {
        return {
            props: {
                posts: null,
                category: null
            }
        }
    }
    const {posts, category} = mapPortfolioData(data)

    return {
        props: {
            posts,
            category
        }
    }
}

const Illustration: NextPageWithLayout & NextPage<IIllustrationProps> = ({posts, category}) => {
    // console.log(JSON.stringify(posts, null, 2))

    /*TODO: insert view if no post is available*/ 
    /*TODO: Contact Form or E-Mail Provider Button on click*/
    return (
        <>  
            {posts && category ? <GalleryWrapper siteTitle={category.name} posts={posts} categoryTexts={category.descriptions}/> :
            <div>Uuups, No illustrations available at the moment. Please come back later!</div>}
            <div className={classNames(styles.contact, 'grid')}>
                <div className={styles['contact-text-wrapper']}>
                    <p className={styles['contact-text']}>
                        Schreiben Sie mir unverbindlich, ich berate Sie gern. <br/>
                        Gemeinsam finden wir die ideale Bildsprache für Ihr Projekt.
                    </p>

                </div>
                
                <Button className={classNames(styles['contact-button'], 'c-bg--4 c-hili--7')} layout='round' accent="circle">Get <br/>in <br/>touch</Button>
            </div>
            
        </>
    )
}

export default Illustration

Illustration.headerColor = NGColor.green
Illustration.footerClass = 'c-bg--yellow'