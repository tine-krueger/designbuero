import { ComponentProps, FC, memo } from "react"
import Image from 'next/image'
import { CustomImage, ICustomImageProps } from "../custom-image/custom-image"
import styles from './news.module.css'
import classNames from "classnames"
import { Headline, IHeadlineProps, PriorityStyle } from "../headline/headline"
import { NGColor } from "../../types/colors"
import Link, { LinkProps } from "next/link"

export interface INewsProps extends ComponentProps<'section'> {
    image?: ICustomImageProps
    headline?: IHeadlineProps
    content?: string
    link: LinkProps & {
        label?: string
    }
}

const UnmemoizedNews: FC<INewsProps> = (props) => {
    const {className, children, headline, link, content, image, ...attributes } = props

    const classes = classNames(className, styles.container, 'grid content-width')

    return (
        <section className={classNames(styles.section, ' m m-v--l')} {...attributes}>
            <div className={classes}>

                <div className={styles.image}>
                    {image && <CustomImage className={classNames(styles['image-wrapper'])} objectFit={'cover'}  {...image}/>}
                </div>
            

                <div className={styles['content-wrapper']}>
                    <Headline {...headline} textColor={NGColor.blue} priority={2} /*priorityStyle={PriorityStyle.h3}*/ />
                    <p>{content}</p>
                    <Link  {...link}>
                        <a>{link.label}</a>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export const News = memo(UnmemoizedNews)

