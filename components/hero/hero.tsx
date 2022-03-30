import classNames from "classnames/bind";
import { ComponentProps, FC, memo } from "react";
import { CustomImage, ICustomImageProps } from "../custom-image/custom-image";
import { Headline, IHeadlineProps, PriorityStyle } from "../headline/headline";
import styles from './hero.module.css'

export interface IHeroProps extends ComponentProps<'div'> {
    image: ICustomImageProps
    headline: IHeadlineProps
    subheadline: IHeadlineProps
}


export const UnmemoizedHero: FC<IHeroProps> = (props) => {

    const {className, image, headline, subheadline, ...attributes} = props
    const classes = classNames(className, styles.container, 'grid grid--align-items-center grid--justify-items-center')
    return (
        <div className={classes} {...attributes}>
           <CustomImage className={styles.background} {...image}/>
           <div className={classNames(styles.content, 'grid grid--justify-items-center')}>
               <Headline className={classNames('c-t--white')} priority={1} priorityStyle={PriorityStyle.main} {...headline}/>
               <Headline className={classNames(styles.subheadline, 'c-t--white font-style--m')} priority={2} {...subheadline} />
           </div>
        </div>
    )
}

export const Hero = memo(UnmemoizedHero)