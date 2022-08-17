import { GetStaticProps, NextPage } from "next";
import { CustomImage, ICustomImageProps } from "../components/custom-image/custom-image";
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
import { useMediaQuery } from "../hooks/media-query-hook";
import bgImage from '../public/assets/img/bg_hero.jpg'


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
        },
        revalidate: 60
    }
}
 
const BusinessGraphics: NextPageWithLayout & NextPage<IBusinessGraphicsProps> = ({data}) => {
    
    const gridChildClasses: TMasonryGridClasses = {
        image: classNames(styles.image)
    }

    const isBreakpoint = useMediaQuery(768)
    return (
        <main>  
            {<Hero className={styles.hero} layout={'layout-3'}
                image={<CustomImage src={bgImage} objectFit={'contain'} priority objectPosition={'top'} sizes={'(min-width: 1600px) 1600px, 100vw'}/>}
                headline={{text: 'Business Graphics', textColor: NGColor.grey}}
            />}
            <div className={classNames(styles['content-wrapper'], 'm m-t--m')}>
                <div className={styles.content}>
                    {data?.content && parse(data.content)}
                    <Button 
                        className={classNames(styles['portfolio-button'], 'c-bg--yellow')}
                        as='link'
                        link={
                            {
                                type: 'mail',
                                href: 'mailto:ng@desingbuero.de?subject=Anfrage%20Portfolio%20Business%20Graphics&body=Hallo%20Frau%20Giesler,%0D%0A%0D%0Abitte%20lassen%20Sie%20mir%20unverbindlich%20Ihr%20Portfolio%20zukommen.'
                            }
                        }
                    >
                        Portfolio anfordern
                    </Button>

                </div>
            </div>
            {data?.testimonials && <Testimonials headline={{text: 'Kundenstimmen'}} testimonials={data.testimonials}/>}
        </main>
    )
}

export default BusinessGraphics

BusinessGraphics.headerColor = NGColor.blue
BusinessGraphics.footerClass = `c-bg--${NGColor.grey}`