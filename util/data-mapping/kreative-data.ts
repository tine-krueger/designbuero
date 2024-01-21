import { ICustomImageProps } from '../../components/custom-image/custom-image'
import { ITestimonialProps } from '../../components/testimonials/testimonial/testimonial'
import { WorkshopProps } from '../../components/workshops/workshop/workshop.types'
import { IKreativProps } from '../../pages/kreativ'
import { KreativPageProps, Posts, WorkshopPostsProps } from '../../types/types'
import { mappedEventsByOccurrences } from './mapped-events-by-occurrences'

export interface IWordpressKreativProps {
	posts: Posts
	page: KreativPageProps
	events: WorkshopPostsProps
}

export function kreativData(data: IWordpressKreativProps): IKreativProps {
	const {
		posts,
		page: { bilderKreativ, textGruppeKreativ, imageText, ...rest },
		events,
		...attributes
	} = data

	const testimonials: ITestimonialProps[] = []
	posts.nodes.map((node) => {
		const testimonial: ITestimonialProps = {
			name: node.testimonials.name,
			quote: node.testimonials.quote,
		}
		testimonials.push(testimonial)
	})

	const images: ICustomImageProps[] | null =
		bilderKreativ.topLeft && bilderKreativ.topCenter && bilderKreativ.topMiddleRight && bilderKreativ.topRight && bilderKreativ.bottomLeft && bilderKreativ.bottomRight
			? [
					{
						src: bilderKreativ.topLeft.sourceUrl,
						title: bilderKreativ.topLeft.title,
						alt: bilderKreativ.topLeft.altText,
						sizes: '(min-width: 1440px) 470px, 33vw',
					},
					{
						src: bilderKreativ.topCenter.sourceUrl,
						title: bilderKreativ.topCenter.title,
						alt: bilderKreativ.topCenter.altText,
						sizes: '(min-width: 1440px) 348px, 25vw',
					},
					{
						src: bilderKreativ.topMiddleRight.sourceUrl,
						title: bilderKreativ.topMiddleRight.title,
						alt: bilderKreativ.topMiddleRight.altText,
						sizes: '(min-width: 1440px) 590px, 41vw',
					},
					{
						src: bilderKreativ.topRight.sourceUrl,
						title: bilderKreativ.topRight.title,
						alt: bilderKreativ.topRight.altText,
						sizes: '(min-width: 1440px) 590px, 41vw',
					},
					{
						src: bilderKreativ.bottomLeft.sourceUrl,
						title: bilderKreativ.bottomLeft.title,
						alt: bilderKreativ.bottomLeft.altText,
						sizes: '(min-width: 1440px) 470px, 33vw',
					},
					{
						src: bilderKreativ.bottomRight.sourceUrl,
						title: bilderKreativ.bottomRight.title,
						alt: bilderKreativ.bottomRight.altText,
						sizes: '(min-width: 1440px) 955px, 66vw',
					},
			  ]
			: null

	const occurencesAsEvents: WorkshopProps[] = mappedEventsByOccurrences(events)

	const kreativProps: IKreativProps = {
		testimonials: testimonials,
		images: images,
		textGroup: [...Object.values(textGruppeKreativ)],
		imageText: {
			text: imageText.text,
			image: {
				src: imageText.image.sourceUrl,
				title: imageText.image.title,
				alt: imageText.image.altText,
				fill: false,
				objectFit: 'contain',
				width: imageText.image.mediaDetails?.width,
				height: imageText.image.mediaDetails?.height,
				sizes: '(min-width: 1440px) 470px, 33vw',
			},
		},
		workshops: occurencesAsEvents,
		...rest,
	}

	return kreativProps
}
