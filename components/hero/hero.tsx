import classNames from "classnames/bind";
import { ComponentProps, FC, memo } from "react";
import { NGColor } from "../../types/colors";
import { Headline, IHeadlineProps, PriorityStyle } from "../headline/headline";
import styles from './hero.module.css'

export interface IHeroProps extends ComponentProps<'div'> {
    image: JSX.Element
    headline?: IHeadlineProps
    subheadline?: IHeadlineProps
    headlineColor?: NGColor
    subheadlineColor?: NGColor
    layout?: 'layout-1' | 'layout-2' | 'layout-3'
}


export const UnmemoizedHero: FC<IHeroProps> = (props) => {

    const {
        className, 
        image, 
        headline, 
        subheadline, 
        layout='layout-1',
        headlineColor = NGColor.white, 
        subheadlineColor = NGColor.white, 
        ...attributes
    } = props
    const classes = classNames(className, styles.container, styles[layout], 'grid grid--align-items-center grid--justify-items-center')
    return (
        <div className={classes} {...attributes}>
            <div className={styles.background} >{image}</div>
           
           {(headline || subheadline) && <div className={classNames(styles.content, 'grid')}>
               {headline && <Headline className={styles.headline} priority={1} textColor={NGColor.white} priorityStyle={PriorityStyle.main} {...headline}/>}
               {subheadline && <Headline className={classNames(styles.subheadline,'font-style--m')} textColor={NGColor.white} priority={2} {...subheadline} />}
           </div>}
        </div>
    )
}

export const Hero = memo(UnmemoizedHero)