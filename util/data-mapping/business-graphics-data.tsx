import { NodeNextRequest } from "next/dist/server/base-http/node";
import { ITestimonialProps } from "../../components/testimonials/testimonial/testimonial";
import { IBusinessGraphicsProps } from "../../pages/business-graphics";

export interface IWordpressBusinessGraphicsPageProps {
  page: IWordpressBusinessGraphicsProps;
  posts: Posts;
}

export interface IWordpressBusinessGraphicsProps {
  bilderBusinessGraphics: BilderBusinessGraphics;
  content: string;
  title: string;
}

interface BilderBusinessGraphics {
  firstImageLeft: FirstImageLeft;
  firstImageRight: FirstImageLeft;
  secondImageLeft: FirstImageLeft;
  secondImageRight: FirstImageLeft;
}

interface FirstImageLeft {
  altText: string;
  sourceUrl: string;
  title: string;
  mediaDetails: MediaDetails;
}

interface MediaDetails {
  height: number;
  width: number;
}

interface Posts {
  nodes: Node[];
}

interface Node {
  testimonials: Testimonials;
}

interface Testimonials {
  company: string;
  name: string;
  quote: string;
  image: Image;
}

interface Image {
  altText: string;
  title: string;
  sourceUrl: string;
}

export function businessGraphicsData(data: IWordpressBusinessGraphicsPageProps): IBusinessGraphicsProps {
    if (data === null) {
      return data
    }
    const {page, posts} = data
    const {bilderBusinessGraphics, ...rest} = page
    const {nodes} = posts

    const testimonials: ITestimonialProps[] = []
    nodes.map(node => {
      const testimonial: ITestimonialProps = {
        name: node.testimonials.name,
        company: node.testimonials.company,
        quote: node.testimonials.quote,
        image: {
          src: node.testimonials.image.sourceUrl,
          alt: node.testimonials.image.altText,
          title: node.testimonials.image.title,
          sizes: '75px'
        },
      }
      testimonials.push(testimonial)
    })

    const businessGraphicsData: IBusinessGraphicsProps = {
        data: {images: [
            {
                src: bilderBusinessGraphics.firstImageLeft.sourceUrl,
                title: bilderBusinessGraphics.firstImageLeft.title,
                alt: bilderBusinessGraphics.firstImageLeft.altText,
                sizes: '(min-width: 768px)60vw, 100vw'
            },
            {
              src: bilderBusinessGraphics.firstImageRight.sourceUrl,
              title: bilderBusinessGraphics.firstImageRight.title,
              alt: bilderBusinessGraphics.firstImageRight.altText,
              sizes: '(min-width: 768px)400vw, 100vw'
           },
            {
                src: bilderBusinessGraphics.secondImageLeft.sourceUrl,
                title: bilderBusinessGraphics.secondImageLeft.title,
                alt: bilderBusinessGraphics.secondImageLeft.altText,
                sizes: '(min-width: 768px)60vw, 100vw'
            },
            {
                src: bilderBusinessGraphics.secondImageRight.sourceUrl,
                title: bilderBusinessGraphics.secondImageRight.title,
                alt: bilderBusinessGraphics.secondImageRight.altText,
                sizes: '(min-width: 768px)400vw, 100vw'
                
            },
        ],
        testimonials: testimonials,
        ...rest}
    }

    return businessGraphicsData

}