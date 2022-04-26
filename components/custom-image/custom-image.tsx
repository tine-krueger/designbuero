import { ImageProps } from "next/image"
import { FC, memo } from "react"
import Image from 'next/image'

export interface ICustomImageProps extends Omit<ImageProps, 'objectFit'> {
    objectFit?: 'cover' | 'contain'
}

export const wordpressLoader = ({ src, width}: any) => {
    const IMAGE_URL = process.env.WP_IMAGE_URL
    console.log(IMAGE_URL)
    return `http://localhost:8888/designbuero_backend/wp-content/uploads/${src}?w=${width}`
}

export const UnmemoizedCustomImage: FC<ICustomImageProps> = (props) => {
    const {className, children, layout='fill', ...attributes} = props
    return (
        <div className={className}>
            <Image layout={layout} {...attributes}/>
        </div>
    )
}

export const CustomImage = memo(UnmemoizedCustomImage)