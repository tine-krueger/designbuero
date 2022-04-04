import { GetStaticProps, NextPage } from "next";
import { CustomImage, ICustomImageProps } from "../components/custom-image/custom-image";
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
import { PriorityStyle } from "../components/headline/headline";


export interface IKreativProps {
    testimonials?: ITestimonialProps[]
}

// export const getStaticProps: GetStaticProps = async() => {
   
// }
 
const Kreativ: NextPageWithLayout & NextPage<IKreativProps> = (props) => {
    const { testimonials} = props
    // console.log(JSON.stringify(props, null, 2))
    const gridChildClasses: TMasonryGridClasses = {
        image: classNames(styles.image)
    }
    return (
        <>  
            <Hero 
                image={<CustomImage src={'/assets/img/dummys/bg02.jpg'} objectFit={'cover'} priority/>}
                headline={{text: 'CREATIVITY IS CONTAGIOUS. PASS IT ON.', priorityStyle: PriorityStyle.h2, textColor: NGColor.white}}
                subheadline={{text: 'Albert Einstein'}}
                layout='layout-2'
            />
       
         
            {testimonials && <Testimonials headline={{text: 'Kundenstimmen'}} testimonials={testimonials}/>}
        </>
    )
}

export default Kreativ

Kreativ.headerColor = NGColor.grey
Kreativ.footerClass = `c-bg--${NGColor.green}`