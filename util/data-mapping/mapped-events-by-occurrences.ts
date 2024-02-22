import { WorkshopProps } from '../../components/workshops/workshop/workshop.types'
import { WorkshopPostsProps } from '../../types/types'
import { htmlStringToPortableText } from '../html-string-to-portable-text'

export function mappedEventsByOccurrences(events: WorkshopPostsProps): WorkshopProps[] {
	const occurencesAsEvents: WorkshopProps[] = []

	events.nodes.map((event) => {
		const portableText = htmlStringToPortableText(event.content)

		event.occurrences?.map((occurence) => {
			const occurenceAsEvent: WorkshopProps = {
				title: event.title,
				id: event.id,
				plz: event.plz,
				address: event.address,
				city: event.city,
				venueName: event.venueName,
				content: portableText,
				startDate: occurence.startDate,
				startTime: occurence.startTime,
				endTime: occurence.endTime,
				dateString: occurence.dateString,
				featuredImage: event.featuredImage
					? {
							src: event.featuredImage?.node.sourceUrl,
							title: event.featuredImage?.node.title,
							alt: event.featuredImage?.node.altText,
							sizes: '(min-width: 1440px) 470px, 33vw',
					  }
					: null,
			}
			occurencesAsEvents.push(occurenceAsEvent)
		})
	})

	occurencesAsEvents.sort((a, b) => {
		const aDate = a.dateString ? Date.parse(a.dateString) : 0
		const bDate = b.dateString ? Date.parse(b.dateString) : 0

		return aDate - bDate
	})

	return occurencesAsEvents
}
