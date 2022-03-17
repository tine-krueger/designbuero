import { NextPage } from "next"
import { ICustomImageProps } from "../components/custom-image/custom-image"
import { Gallery } from "../components/gallery/gallery"
import { NGColor } from "../types/colors"

export interface IIllustrationProps {}

const images: ICustomImageProps[] = [
    {
        src: 'https://source.unsplash.com/random/1200x800/?bird'
    },
    {
        src: 'https://source.unsplash.com/random/900x500/?odessa'
    },
    {
        src: 'https://source.unsplash.com/random/1000x1000/?berlin'
    },
    {
        src: 'https://source.unsplash.com/random/1200x800/?vilnius'
    },
    {
        src: 'https://source.unsplash.com/random/900x500/?riga'
    },
    {
        src: 'https://source.unsplash.com/random/1000x1000/?Tallin'
    },
    {
        src: 'https://source.unsplash.com/random/1200x800/?rotterdam'
    },
    {
        src: 'https://source.unsplash.com/random/900x500/?Liverpool'
    },
    {
        src: 'https://source.unsplash.com/random/1000x1000/?avignon'
    },
]

const Illustration: NextPage<IIllustrationProps> = () => {
    return (
        <>
            <Gallery images={images} highlightColor={NGColor.green}/>
        </>
    )
}

export default Illustration