import { GetStaticProps, NextPage } from "next";
import { CustomImage, ICustomImageProps } from "../components/custom-image/custom-image";
import { ImageGridGallery, TMasonryGridClasses } from "../components/gallery-group/masonry-grid/ImageGridGallery";
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
import heroImage from '../public/assets/img/kreativ_hero.jpg'
import Einstein from '../public/assets/svg/einstein.svg'
import { useMediaQuery } from "../hooks/media-query-hook";
import Zweig from '../public/assets/svg/zweig.svg'
 


export interface IKreativProps {
    testimonials?: ITestimonialProps[]
    images?: ICustomImageProps[] | null
    textGroup?: string[]
    title?: string
    imageText?: IImageTextProps
}

export const getStaticProps: GetStaticProps = async() => {
    const page = await getKreativData()

    if(page === null) {
        return {
            props: {},
            revalidate: 60
        }
    }  

    const data = kreativData(page)

    return {
        props: {
            ...data
        },
        revalidate: 60
    }
}
 
const Kreativ: NextPageWithLayout & NextPage<IKreativProps> = (props) => {
    const { testimonials, images, textGroup, title, imageText, ...rest} = props
  
    const gridChildClasses: TMasonryGridClasses = {
        image: classNames(styles.image)
    }

    const isBreakpoint = useMediaQuery(768)
    return (
        <main>  
            <Hero 
                image={<CustomImage src={heroImage} objectFit={'cover'} priority objectPosition={'top'}/>}
                content={<Einstein></Einstein>}
                layout='layout-2'
            />

            {imageText && (
                <ImageText 
                    className={classNames(styles['image-text'], 'm m-t p p-v')}
                    childElementsClasses={{
                        image: styles.image,
                        content: styles.content
                    }}
                    image={!isBreakpoint ? imageText.image : null} 
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
                    images={isBreakpoint ? [images[0]] : images} 
                    objectFit={'cover'}
                >
                    <Button 
                        className={classNames(styles['show-all'], 'font-style--highlight')} 
                        backgroundColor={NGColor.yellow}
                        blobColor={NGColor.green}
                        layout={'round'} 
                        accent={'circle'}
                        as={'link'} 
                        link={{
                            type: 'internal',
                            href: '/kreativ/work'
                        }}>Show <br/>All</Button>
                </ImageGridGallery>
                )
            }

            {textGroup && (
                <section className={styles['text-group-wrapper']}>
                    <HighlightedTextGroup className={styles['text-group']} textGroup={textGroup}>
                        <Button 
                            className={classNames(styles['get-in-touch'], 'font-style--highlight')} 
                            layout={'round'} backgroundColor={NGColor.petrol} blobColor={NGColor.green}
                            as={'link'}
                            link={{
                                type: 'mail',
                                href: 'mailto:ng@desingbuero.de?subject=Anfrage%20Kreativ&body=Hallo%20Frau%20Giesler,'
                            }}
                        >
                            Get in <br/> touch!
                        </Button>
                    </HighlightedTextGroup>
                    <Zweig className={classNames(styles.zweig, 'visible-s')}/>
                </section>
                )}
            
            {testimonials && <Testimonials className={classNames('m m-t')} headline={{text: 'Teilnehmer-\nfeedback'}} layout={'creative'} testimonials={testimonials}/>}
        </main>
    )
}

export default Kreativ

Kreativ.headerColor = NGColor.grey
Kreativ.footerClass = `c-bg--${NGColor.green}`