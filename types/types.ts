import { HTMLAttributes } from "react"

export interface Posts {
	nodes: Node[]
}

interface Node {
	testimonials: Testimonials
}

interface Testimonials {
	name: string
	quote: string
}

export interface KreativPageProps {
	bilderKreativ: BilderKreativ
	textGruppeKreativ: TextGruppeKreativ
	imageText: ImageText
	title: string
}

interface ImageText {
	text: string
	image: Image
}

interface TextGruppeKreativ {
	textfield1: string
	textfield2: string
	textfield3: string
}

interface BilderKreativ {
	bottomLeft?: Image
	bottomRight?: Image
	topCenter?: Image
	topLeft?: Image
	topRight?: Image
	topMiddleRight?: Image
}

interface Image {
	altText: string
	sourceUrl: string
	title: string
	mediaDetails?: IMediaDetails
}

interface IMediaDetails {
	width: number
	height: number
}

export interface WorkshopPostsProps {
	nodes: WorkshopNode[]
}

export interface WorkshopNode {
	title: string
	id: string
	plz?: string
	address?: string
	city?: string
	venueName?: string
	content: string
	featuredImage: feauredImageNode
	occurrences: {
		endTime: string
		startDate: string
		startTime: string
		dateString: string
	}[]
}

interface feauredImageNode {
	node: Image
}

export interface ICkHTMLAttributes<T> extends Omit<HTMLAttributes<T>, 'content'> {}
