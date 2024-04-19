import { HTMLAttributes } from 'react'
import { IPostProps } from '../gallery-wrapper'

export interface IImageSliderProps extends HTMLAttributes<HTMLDivElement> {
	images: IPostProps[]
	index?: number
}
