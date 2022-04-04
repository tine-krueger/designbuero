import { GetStaticProps, NextPage } from "next";
import { ICustomImageProps } from "../components/custom-image/custom-image";
import { ImageGridGallery, TMasonryGridClasses } from "../components/gallery-group/masonry-grid/masonry-grid";
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
    images?: ICustomImageProps[]
    content?: string
    testimonials?: ITestimonialProps[]
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
 
const BusinessGraphics: NextPageWithLayout & NextPage<IBusinessGraphicsProps> = (props) => {
    const {images, content, testimonials} = props
    // console.log(JSON.stringify(props, null, 2))
    const gridChildClasses: TMasonryGridClasses = {
        image: classNames(styles.image)
    }
    return (
        <>  
            {images && <Hero 
                image={<ImageGridGallery className={styles['image-grid']} childElementsClasses={gridChildClasses} images={images} objectFit={'cover'} imagesHavePriority={true}/>}
                headline={{text: 'Business Graphics', textColor: NGColor.yellow}}
            />}
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    {content && parse(content)}
                    <Button className={classNames(styles['portfolio-button'], 'c-bg--yellow')}>Portfolio anfordern</Button>

                </div>
            </div>
            {testimonials && <Testimonials headline={{text: 'Kundenstimmen'}} testimonials={testimonials}/>}
        </>
    )
}

export default BusinessGraphics

BusinessGraphics.headerColor = NGColor.blue
BusinessGraphics.footerClass = 'c-bg--5'