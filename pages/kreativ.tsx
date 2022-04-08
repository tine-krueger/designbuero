import { GetStaticProps, NextPage } from "next";
import { CustomImage, ICustomImageProps } from "../components/custom-image/custom-image";
import { ImageGridGallery, TMasonryGridClasses } from "../components/gallery-group/masonry-grid/masonry-grid";
import { NGColor } from "../types/colors";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/kreativ.module.css'
import classNames from "classnames";
import { Testimonials } from "../components/testimonials/testimonials";
import { ITestimonialProps } from "../components/testimonials/testimonial/testimonial";
import { Hero } from "../components/hero/hero";
import { Headline, PriorityStyle } from "../components/headline/headline";
import { getKreativData } from "../lib/api";
import { kreativData } from "../util/data-mapping/kreative-data";
import { Button } from "../components/button/button";
import { HighlightedTextGroup } from "../components/text-with-highlight-term/highlighted-text-group";
import { IImageTextProps, ImageText } from "../components/image-text/single-image-text/image-text";


export interface IKreativProps {
    testimonials?: ITestimonialProps[]
    images?: ICustomImageProps[]
    textGroup?: string[]
    title?: string
    imageText?: IImageTextProps
}

export const getStaticProps: GetStaticProps = async() => {
   const page = await getKreativData()
    const data = kreativData(page)

   return {
       props: {
           ...data
       }
   }
}
 
const Kreativ: NextPageWithLayout & NextPage<IKreativProps> = (props) => {
    const { testimonials, images, textGroup, title, imageText, ...rest} = props
    // console.log(JSON.stringify(props, null, 2))
    console.log()
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

            {imageText && (
                <ImageText 
                    className={classNames(styles['image-text'], 'm m-t p p-v')}
                    childElementsClasses={{
                        image: styles.image,
                        content: styles.content
                    }}
                    image={imageText.image} 
                    text={
                    <>
                        <Headline priority={2} priorityStyle={PriorityStyle.h1} text={title}/>
                        <p>{imageText.text}</p>
                    </>
                    }
                />
                )
            }
       
            {images && (
                <ImageGridGallery 
                    className={styles['image-grid']} 
                    childElementsClasses={gridChildClasses} 
                    images={images} 
                    objectFit={'cover'}
                >
                    <Button 
                        className={classNames(styles['show-all'], 'font-style--highlight-2')} 
                        backgroundColor={NGColor.yellow}
                        blobColor={NGColor.green}
                        layout={'round'} 
                        as={'link'} 
                        href='/kreativ/work'>Show <br/>All</Button>
                </ImageGridGallery>
                )
            }

            {textGroup && (
                <section className={styles['text-group-wrapper']}>
                    <HighlightedTextGroup className={styles['text-group']} textGroup={textGroup}>
                        <Button className={classNames(styles['get-in-touch'], 'font-style--highlight-2')} layout={'round'} backgroundColor={NGColor.petrol} blobColor={NGColor.green}>Get in <br/> touch!</Button>
                    </HighlightedTextGroup>
                </section>
                )}
            
            {testimonials && <Testimonials className={classNames('m m-t')} headline={{text: 'Teilnehmer-\nfeedback'}} layout={'creative'} testimonials={testimonials}/>}
        </>
    )
}

export default Kreativ

Kreativ.headerColor = NGColor.grey
Kreativ.footerClass = `c-bg--${NGColor.green}`