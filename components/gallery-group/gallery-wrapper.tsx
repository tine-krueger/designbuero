import classNames from "classnames"
import { ComponentProps, FC, memo, useEffect, useState } from "react"
import { NGColor } from "../../types/colors"
import { ICustomImageProps } from "../custom-image/custom-image"
import { Headline } from "../headline/headline"
import { GalleryNavigation } from "./gallery-navigation/gallery-navigation"
import styles from './gallery-wrapper.module.css'
import { Gallery } from "./gallery/gallery"

export interface IPostProps {
    image: ICustomImageProps
    tags: string[]
    category?: string
}

export interface IGalleryWrapperProps extends ComponentProps<'div'> {
    siteTitle: string
    posts: IPostProps[]
    headlineColor?: NGColor
    categoryTexts?: string[]
}



export const UnmemoizedGalleryWrapper: FC<IGalleryWrapperProps> = (props) => {

    const {className, children, siteTitle, headlineColor = NGColor.green, posts, categoryTexts, ...attributes} = props
    const classes = classNames(className, styles.container, 'grid m m-v--m')
    const [shownPosts, setShownPosts ] = useState<IPostProps[]>([])

    const [tags, setTags] = useState<Set<string> | undefined>()

    useEffect(() => {
        setShownPosts(posts)
        getTags(posts)
    }, [])

   
    return(
        <div className={classes} {...attributes}>
            <Headline className={styles.headline} textColor={headlineColor} onClick={handleHeadlineClick}>{siteTitle}</Headline>
            {tags && <GalleryNavigation className={styles.navigation} categories={tags} onNavItemClick={handleNavbarClick}/>}
            
            <Gallery className={classNames(styles.gallery)} texts={categoryTexts} images={shownPosts}/>

        </div>
    )
    
    function getTags(posts: IPostProps[]){
        const tags: string[] = []
        posts.map(post => tags.push(...post.tags))
        const tagsSet = new Set(tags)
        setTags(tagsSet)
    }

    function handleNavbarClick(tag: string) {
        const newPostArray = posts.filter(post => post.tags.includes(tag))
        setShownPosts(newPostArray)
    }

    function handleHeadlineClick() {
        setShownPosts(posts)
    }
}

export const GalleryWrapper = memo(UnmemoizedGalleryWrapper)