import { ICustomImageProps } from "../../components/custom-image/custom-image";
import { ITestimonialProps } from "../../components/testimonials/testimonial/testimonial";
import { IKreativProps } from "../../pages/kreativ";

export interface IWordpressKreativProps {
  posts: Posts;
  page: Page;
}

interface Posts {
  nodes: Node[];
}

interface Node {
  testimonials: Testimonials;
}

interface Testimonials {
  name: string;
  quote: string;
}

interface Page {
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
  textfield1: string;
  textfield2: string;
  textfield3: string;
}
  
interface BilderKreativ {
  bottomLeft?: Image;
  bottomRight?: Image;
  topCenter?: Image;
  topLeft?: Image;
  topRight?: Image;
  topMiddleRight?: Image;
}

interface Image {
  altText: string;
  sourceUrl: string;
  title: string;
  mediaDetails?: IMediaDetails 
}

interface IMediaDetails {
    width: number
    height: number
}


export function kreativData(data: IWordpressKreativProps): IKreativProps {
    const {posts, page: {bilderKreativ, textGruppeKreativ, imageText, ...rest}} = data
  //  console.log(JSON.stringify(data, null, 2))

    const testimonials: ITestimonialProps[] = []
    posts.nodes.map( node => {
        const testimonial: ITestimonialProps = {
            name: node.testimonials.name,
            quote: node.testimonials.quote
        }
        testimonials.push(testimonial)
    })

    const images: ICustomImageProps[] | null = bilderKreativ.topLeft && 
    bilderKreativ.topCenter && bilderKreativ.topMiddleRight && bilderKreativ.topRight && bilderKreativ.bottomLeft && bilderKreativ.bottomRight ? [
        {
            src: bilderKreativ.topLeft.sourceUrl,
            title: bilderKreativ.topLeft.title,
            alt: bilderKreativ.topLeft.altText,
            sizes: '(min-width: 1440px) 470px, 33vw'
        },
        {
            src: bilderKreativ.topCenter.sourceUrl,
            title: bilderKreativ.topCenter.title,
            alt: bilderKreativ.topCenter.altText,
            sizes: '(min-width: 1440px) 348px, 25vw'
        },
        {
          src: bilderKreativ.topMiddleRight.sourceUrl,
          title: bilderKreativ.topMiddleRight.title,
          alt: bilderKreativ.topMiddleRight.altText,
          sizes: '(min-width: 1440px) 590px, 41vw'
        },
        {
            src: bilderKreativ.topRight.sourceUrl,
            title: bilderKreativ.topRight.title,
            alt: bilderKreativ.topRight.altText,
            sizes: '(min-width: 1440px) 590px, 41vw'
        },
        {
            src: bilderKreativ.bottomLeft.sourceUrl,
            title: bilderKreativ.bottomLeft.title,
            alt: bilderKreativ.bottomLeft.altText,
            sizes: '(min-width: 1440px) 470px, 33vw'
        },
        {
            src: bilderKreativ.bottomRight.sourceUrl,
            title: bilderKreativ.bottomRight.title,
            alt: bilderKreativ.bottomRight.altText,
            sizes: '(min-width: 1440px) 955px, 66vw'
        },
    ] : null

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
            layout: 'responsive',
            objectFit: 'contain',
            width: imageText.image.mediaDetails?.width,
            height: imageText.image.mediaDetails?.height,
            sizes: '(min-width: 1440px) 470px, 33vw'
          }
        },
        ...rest
    }

    return kreativProps
}