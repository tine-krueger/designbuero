import { GetStaticProps, NextPage } from "next";
import { ICustomImageProps } from "../components/custom-image/custom-image";
import { ImageGridGallery, TMasonryGridClasses } from "../components/gallery-group/masonry-grid/ImageGridGallery";
import { NGColor } from "../types/colors";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/business-graphics.module.css'
import { Button } from "../components/button/button";
import classNames from "classnames";
import { getBusinessGraphicsData } from "../lib/api";
import { businessGraphicsData, IWordpressBusinessGraphicsPageProps } from "../util/data-mapping/business-graphics-data";
import parse from 'html-react-parser';
import { Testimonials } from "../components/testimonials/testimonials";
import { ITestimonialProps } from "../components/testimonials/testimonial/testimonial";
import { Hero } from "../components/hero/hero";


export interface IBusinessGraphicsProps {
    data: {
        images?: ICustomImageProps[]
        content?: string
        testimonials?: ITestimonialProps[]
    } | null
   
}

export const getStaticProps: GetStaticProps = async() => {
    const page: IWordpressBusinessGraphicsPageProps = await getBusinessGraphicsData()
    const data: IBusinessGraphicsProps = businessGraphicsData(page)
    return {
        props: {
            ...data
        }
    }
}
 
const BusinessGraphics: NextPageWithLayout & NextPage<IBusinessGraphicsProps> = ({data}) => {
    
    // console.log(JSON.stringify(data, null, 2))
    const gridChildClasses: TMasonryGridClasses = {
        image: classNames(styles.image)
    }
    return (
        <main>  
            {data?.images && <Hero 
                image={<ImageGridGallery className={styles['image-grid']} childElementsClasses={gridChildClasses} images={data.images} objectFit={'cover'} imagesHavePriority={true}/>}
                headline={{text: 'Business Graphics', textColor: NGColor.yellow}}
            />}
            <div className={classNames(styles['content-wrapper'], 'm m-t--m')}>
                <div className={styles.content}>
                    {data?.content && parse(data.content)}
                    <Button className={classNames(styles['portfolio-button'], 'c-bg--yellow')}>Portfolio anfordern</Button>

                </div>
            </div>
            {data?.testimonials && <Testimonials headline={{text: 'Kundenstimmen'}} testimonials={data.testimonials}/>}
        </main>
    )
}

export default BusinessGraphics

BusinessGraphics.headerColor = NGColor.blue
BusinessGraphics.footerClass = 'c-bg--5'