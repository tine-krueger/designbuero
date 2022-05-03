import { GetStaticProps, NextPage } from "next"
import { GalleryWrapper, IPostProps } from "../../components/gallery-group/gallery-wrapper"
import { NextPageWithLayout } from "../_app"
import { NGColor } from "../../types/colors"
import { getPortfolioDataByCatId } from "../../lib/api"
import { IWordpressPortfolioProps, mapPortfolioData } from "../../util/data-mapping/illustration-data"
import { IIllustrationProps } from "../illustration"

export interface ICategoryProps {
    name: string
    descriptions?: string []
}

export interface IKreativProps extends IIllustrationProps {
    
}

export const getStaticProps: GetStaticProps = async() => {
    const data: IWordpressPortfolioProps = await getPortfolioDataByCatId(16)

    if (null === data ) {
        return {
            props: {
                posts: null,
                category: null
            },
            revalidate: 60
        }
    }
    const {posts, category}: IIllustrationProps = mapPortfolioData(data)

    return {
        props: {
            posts,
            category
        },
        revalidate: 60
    }
}

const KreativWork: NextPageWithLayout & NextPage<IKreativProps> = ({posts, category}) => {
    // console.log(JSON.stringify(posts, null, 2))

    /*TODO: insert view if no post is available*/ 
    /*TODO: Contact Form or E-Mail Provider Button on click*/
    return (
        <main>  
            {posts && category ? (
                <GalleryWrapper 
                    siteTitle={category.name} 
                    posts={posts}
                    headlineColor={NGColor.grey}
                    categoryTexts={category.descriptions}
                /> 
                ):
            <div>Uuups, No work to show at the moment. Please come back later!</div>}
        </main>
    )
}

export default KreativWork

KreativWork.headerColor = NGColor.grey
KreativWork.footerClass = `c-bg--${NGColor.green}`