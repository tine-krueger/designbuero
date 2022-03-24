import classNames from "classnames"
import { setLazyProp } from "next/dist/server/api-utils"
import { ComponentProps, FC, memo, useEffect, useState } from "react"
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

}



export const UnmemoizedGalleryWrapper: FC<IGalleryWrapperProps> = (props) => {

    const {className, children, siteTitle, posts, ...attributes} = props
    const classes = classNames(className, styles.container, 'grid m m-v--m')
    const [shownPosts, setShownPosts ] = useState<IPostProps[]>([])

    const [tags, setTags] = useState<Set<string> | undefined>()

    useEffect(() => {
        setShownPosts(posts)
        getTags(posts)
    }, [])

   
    return(
        <div className={classes}>
            <Headline className={styles.headline} onClick={handleHeadlineClick}>{siteTitle}</Headline>
            {tags && <GalleryNavigation className={styles.navigation} categories={tags} onNavItemClick={handleNavbarClick}/>}
            
            <Gallery className={classNames(styles.gallery)}images={shownPosts}/>

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