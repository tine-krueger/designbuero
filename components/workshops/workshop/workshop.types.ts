import { WorkshopNode } from '../../../types/types'
import { ICustomImageProps } from '../../custom-image/custom-image'

export interface WorkshopProps extends Omit<WorkshopNode, 'featuredImage' | 'occurrences'> {
	featuredImage?: ICustomImageProps | null
	startDate: string
	startTime: string
	endTime: string
	dateString?: string
}
