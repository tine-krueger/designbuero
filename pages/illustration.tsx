import { GetStaticProps, NextPage } from "next"
import { ICustomImageProps } from "../components/custom-image/custom-image"
import { GalleryWrapper, IPostProps } from "../components/gallery-group/gallery-wrapper"
import { Gallery } from "../components/gallery-group/gallery/gallery"
import { getIllustrationData } from "../lib/api"
import { NGColor } from "../types/colors"
import { IllustrationRootObject, mapData } from "../util/data-mapping/illustration-data"

export interface IIllustrationProps {
    posts: IPostProps[]
    category: string
}

export const getStaticProps: GetStaticProps = async() => {
    const data: IllustrationRootObject = await getIllustrationData()
    const posts: IPostProps[] = mapData(data)
    const category: string = data.category.name

    return {
        props: {
            posts,
            category
        }
    }
}

const Illustration: NextPage<IIllustrationProps> = ({posts, category}) => {
    // console.log(JSON.stringify(posts, null, 2))

    /*@TODO: insert view if no post is available*/ 
    return (
        <>  
            <GalleryWrapper siteTitle={category} posts={posts}/>
        </>
    )
}

export default Illustration