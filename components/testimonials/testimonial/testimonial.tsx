import classNames from "classnames"
import { ComponentProps, FC, memo } from "react"
import { CustomImage, ICustomImageProps } from "../../custom-image/custom-image"
import { TTestimonialLayout } from "../testimonials"
import styles from './testimonial.module.css'

// export type TMasonryGridClasses = {
//     image?: string
//  }
 
 export interface ITestimonialProps extends ComponentProps<'div'> {
     image?: ICustomImageProps | null
     name?: string
     company?: string
     quote?: string
     
 }

 interface IInternaltesTimonialProps {
    layout: TTestimonialLayout
 }
 
//  interface IInternalMasonryGridGalleryProps {
//      childElementsClasses?: TMasonryGridClasses
//      objectFit?: 'cover' | 'contain'
//  }
 
 const UnmemoizedTestimonial: FC<ITestimonialProps & IInternaltesTimonialProps> = (props) => {
     const {className, children, image, name, company, quote, layout, ...attributes} = props
     const classes = classNames(className, styles.container, styles[layout])
     return (
         <div className={classes} {...attributes}>
             <div className={classNames(styles['quote-wrapper'])}>
                <p className={classNames(styles.quote)}>{quote}</p>
             </div>
            
            <div className={classNames(styles['info-wrapper'])}>
                {image && image !== null && <CustomImage className={classNames(styles.image)} {...image} loading={'lazy'}/>}
                <p className={classNames(styles.name)}>{name}</p>
                {company && <p className={classNames(styles.description)}>{company}</p>}

            </div>  
         </div>
     )
 }
 
 export const Testimonial = memo(UnmemoizedTestimonial)