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
  bottomLeft: Image;
  bottomRight: Image;
  topCenter: Image;
  topLeft: Image;
  topRight: Image;
}

interface Image {
  altText: string;
  sourceUrl: string;
  title: string;
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

    const images: ICustomImageProps[] = [
        {
            src: bilderKreativ.topLeft.sourceUrl,
            title: bilderKreativ.topLeft.title,
            alt: bilderKreativ.topLeft.altText
        },
        {
            src: bilderKreativ.topCenter.sourceUrl,
            title: bilderKreativ.topCenter.title,
            alt: bilderKreativ.topCenter.altText
        },
        {
            src: bilderKreativ.topRight.sourceUrl,
            title: bilderKreativ.topRight.title,
            alt: bilderKreativ.topRight.altText
        },
        {
            src: bilderKreativ.bottomLeft.sourceUrl,
            title: bilderKreativ.bottomLeft.title,
            alt: bilderKreativ.bottomLeft.altText
        },
        {
            src: bilderKreativ.bottomRight.sourceUrl,
            title: bilderKreativ.bottomRight.title,
            alt: bilderKreativ.bottomRight.altText
        },
    ]

    const kreativProps: IKreativProps = {
        testimonials: testimonials,
        images: images, 
        textGroup: [...Object.values(textGruppeKreativ)],
        imageText: {
          text: imageText.text,
          image: {
            src: imageText.image.sourceUrl,
            title: imageText.image.title,
            alt: imageText.image.altText
          }
        },
        ...rest
    }

    return kreativProps
}