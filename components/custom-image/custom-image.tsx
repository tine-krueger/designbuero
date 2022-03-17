import { ImageProps } from "next/image"
import { FC, memo } from "react"
import Image from 'next/image'

export interface ICustomImageProps extends Omit<ImageProps, 'objectFit'> {
    objectFit?: 'cover' | 'contain'
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