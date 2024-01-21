import { HTMLAttributes } from 'react'
import { WorkshopProps } from './workshop/workshop.types'

export interface WorkshopsProps extends HTMLAttributes<'div'> {
	workshops: WorkshopProps[]
}
