import { NextPage } from "next";
import { ICustomImageProps } from "../components/custom-image/custom-image";
import { MasonryGridGallery } from "../components/gallery-group/masonry-grid/masonry-grid";
import { NGColor } from "../types/colors";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/business-graphics.module.css'

const left: ICustomImageProps[] = [
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
]

const right: ICustomImageProps[] = [
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
    {
        src: 'https://source.unsplash.com/random/?city,night'
    },
]
 
const BusinessGraphics: NextPageWithLayout & NextPage= () => {
    return (
        <>
            <MasonryGridGallery className={styles['image-grid']} leftGrid={left} rightGrid={right} objectFit={'cover'}/>
        </>
    )
}

export default BusinessGraphics

BusinessGraphics.headerColor = NGColor.blue
BusinessGraphics.footerClass = 'c-bg--5'