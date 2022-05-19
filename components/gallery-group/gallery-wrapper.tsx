import classNames from "classnames"
import { ChangeEvent, ComponentProps, FC, memo, useEffect, useState } from "react"
import SelectSearch, { SelectedOption, SelectedOptionValue, SelectSearchProps } from "react-select-search-nextjs"
import { useMediaQuery } from "../../hooks/media-query-hook"
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

interface ISelectOption {
    name: string
    value: string
}

export const UnmemoizedGalleryWrapper: FC<IGalleryWrapperProps> = (props) => {

    const {className, children, siteTitle, headlineColor = NGColor.green, posts, categoryTexts, ...attributes} = props
    const classes = classNames(className, styles.container, 'grid m m-b--m')
    const isBreakpoint = useMediaQuery(768)
    const [shownPosts, setShownPosts ] = useState<IPostProps[]>([])

    const [tags, setTags] = useState<Set<string> | undefined>()

    const [selectTags, setSelectTags] = useState<any>()

    useEffect(() => {
        setShownPosts(posts)
        getTags(posts)
    }, [])

    useEffect(() => {

        if (!tags) {
            return
        }

        const selectOptions: ISelectOption[] = []
        tags.forEach(tag => selectOptions.push({name: tag, value: tag}) )
        setSelectTags(selectOptions)
    }, [tags])

   
    return(
        <div className={classes} {...attributes}>
            <Headline className={styles.headline} textColor={headlineColor} onClick={handleHeadlineClick}>{siteTitle}</Headline>
            {!isBreakpoint ? (
                tags && <GalleryNavigation className={styles.navigation} categories={tags} onNavItemClick={handleNavbarClick}/>
                ) : (
                    selectTags && <SelectSearch className={styles.select} options={selectTags} onChange={handleSelectChange} placeholder="Wähle eine Kategorie" printOptions={'always'}/>
                )}
            
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

    function handleSelectChange(selectedValue: SelectedOptionValue | SelectedOptionValue[]) {
            if (Array.isArray(selectedValue)) return
            console.log(selectedValue)
            /*@ts-ignore*/
            const newPostArray = posts.filter(post => post.tags.includes(selectedValue as string))
            setShownPosts(newPostArray)
    }
}

export const GalleryWrapper = memo(UnmemoizedGalleryWrapper)