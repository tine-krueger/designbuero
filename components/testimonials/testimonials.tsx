import classNames from "classnames"
import { ComponentProps, FC, memo } from "react"
import { uid } from "react-uid"
import { NGColor } from "../../types/colors"
import { Headline, IHeadlineProps } from "../headline/headline"
import { ITestimonialProps, Testimonial } from "./testimonial/testimonial"
import styles from './testimonials.module.css'

export type TTestimonialLayout = 'business' | 'creative'
export interface ITestimonialsProps extends ComponentProps<'div'> {
     testimonials: ITestimonialProps[]
     headline?: IHeadlineProps
     layout?: TTestimonialLayout
 }
 
 
const UnmemoizedTestimonials: FC<ITestimonialsProps> = (props) => {
     const {className, children, testimonials, headline, layout = 'business', ...attributes} = props
     const classes = classNames(className, styles.container, styles[layout])
     return (
        <div className={classes} {...attributes}>
            {headline && <Headline className={styles.headline} textColor={NGColor.grey} {...headline} />}
            <div className={classNames(styles.wrapper, 'flex')}>
                {testimonials.map( testimonial => (
                    <Testimonial key={uid(testimonial)} layout={layout} {...testimonial}/>
                ))}
            </div>
                 
        </div>
    )
 }
 
 export const Testimonials = memo(UnmemoizedTestimonials)