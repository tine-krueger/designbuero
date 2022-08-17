import { NodeNextRequest } from "next/dist/server/base-http/node";
import { ICustomImageProps } from "../../components/custom-image/custom-image";
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
  homeImage?: FirstImageLeft;
}

export interface FirstImageLeft {
  altText: string;
  sourceUrl: string;
  title: string;
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
        image: node.testimonials.image ? {
          src: node.testimonials.image.sourceUrl,
          alt: node.testimonials.image.altText,
          title: node.testimonials.image.title,
          sizes: '75px'
        } : null,
      }
      testimonials.push(testimonial)
    })



    const businessGraphicsData: IBusinessGraphicsProps = {
        

        data: {
          testimonials: testimonials,
         ...rest
        }
    }

    return businessGraphicsData

}