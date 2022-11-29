import { IAboutMeProps } from '../../pages/about-me'

export interface IAboutMeWordpress {
	page: Page
}

interface Page {
	contentAboutMe: ContentAboutMe
	title: string
}

interface ContentAboutMe {
	textImage1: TextImage
	textImage2: TextImage
	textImage3: TextImage
}

interface TextImage {
	text: string
	image: Image | null
}

interface Image {
	altText: string
	sourceUrl: string
	mediaDetails: MediaDetails
	title: string
}

interface MediaDetails {
	width: number
	height: number
}

export function getAboutMeProps(data: IAboutMeWordpress): IAboutMeProps {
	const {
		page: { contentAboutMe, title },
		...rest
	} = data
	const aboutMeProps: IAboutMeProps = {
		headline: title,
		content: [
			{
				text: contentAboutMe.textImage1.text,
				image: contentAboutMe.textImage1.image
					? {
							src: contentAboutMe.textImage1.image?.sourceUrl,
							title: contentAboutMe.textImage1.image?.title,
							alt: contentAboutMe.textImage1.image?.altText,
							fill: false,
							width: contentAboutMe.textImage1.image?.mediaDetails.width,
							height: contentAboutMe.textImage1.image?.mediaDetails.height,
							priority: true,
					  }
					: null,
			},
			{
				text: contentAboutMe.textImage2.text,
				image: contentAboutMe.textImage2.image
					? {
							src: contentAboutMe.textImage2.image?.sourceUrl,
							title: contentAboutMe.textImage2.image?.title,
							alt: contentAboutMe.textImage2.image?.altText,
							fill: false,
							width: contentAboutMe.textImage2.image?.mediaDetails.width,
							height: contentAboutMe.textImage2.image?.mediaDetails.height,
					  }
					: null,
			},
			{
				text: contentAboutMe.textImage3.text,
				image: contentAboutMe.textImage3.image
					? {
							src: contentAboutMe.textImage3.image?.sourceUrl,
							title: contentAboutMe.textImage3.image?.title,
							alt: contentAboutMe.textImage3.image?.altText,
							fill: false,
							width: contentAboutMe.textImage3.image?.mediaDetails.width,
							height: contentAboutMe.textImage3.image?.mediaDetails.height,
					  }
					: null,
			},
		],
		...rest,
	}

	return aboutMeProps
}
