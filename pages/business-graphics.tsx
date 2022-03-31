import { GetStaticProps, NextPage } from "next";
import { ICustomImageProps } from "../components/custom-image/custom-image";
import { MasonryGridGallery } from "../components/gallery-group/masonry-grid/masonry-grid";
import { NGColor } from "../types/colors";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/business-graphics.module.css'
import { Button } from "../components/button/button";
import classNames from "classnames";
import { getBusinessGraphicsData } from "../lib/api";
import { businessGraphicsData, IWordpressBusinessGraphicsPageProps } from "../util/data-mapping/business-graphics-data";
import parse from 'html-react-parser';
import { Headline } from "../components/headline/headline";

const left: ICustomImageProps[] = [
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
]

const right: ICustomImageProps[] = [
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
]

export interface IBusinessGraphicsProps {
    leftImages?: ICustomImageProps[]
    rightImages?: ICustomImageProps[]
    content?: string
}

export const getStaticProps: GetStaticProps = async() => {
    const page: IWordpressBusinessGraphicsPageProps = await getBusinessGraphicsData()
    const data: IBusinessGraphicsProps = businessGraphicsData(page.page)
    return {
        props: {
            ...data
        }
    }
}
 
const BusinessGraphics: NextPageWithLayout & NextPage<IBusinessGraphicsProps> = (props) => {
    const {leftImages, rightImages, content} = props
    console.log(leftImages)
    return (
        <>
            {leftImages && rightImages && <MasonryGridGallery className={styles['image-grid']} leftGrid={leftImages} rightGrid={rightImages} objectFit={'cover'}/>}
            <div className={styles['content-wrapper']}>
                
                <div className={styles.content}>
                    <Headline textColor={NGColor.blue}>Business Graphics</Headline>
                    {content && parse(content)}
                    <Button className={classNames(styles['portfolio-button'], 'c-bg--yellow')}>Portfolio anfordern</Button>

                </div>
                
            </div>
        </>
    )
}

export default BusinessGraphics

BusinessGraphics.headerColor = NGColor.blue
BusinessGraphics.footerClass = 'c-bg--5'