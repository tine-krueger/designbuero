import { IHomeProps } from "../../pages";
import { FirstImageLeft } from "./business-graphics-data";




export interface IHomeWordpress {
  news: NewsPosts
  kreativ: KreativIllustration;
  illustration: KreativIllustration
  businessGraphics: BusinessGraphics
  nodeByUri: NodeByUri;
}

interface NodeByUri {
  landingAboutMe: LandingAboutMe;
}

interface LandingAboutMe {
  welcomeHeadline: string;
  welcomeText: string;
}

interface NewsPosts {
  nodes: CategoryNode[];
}

interface KreativIllustration {
    nodes: KINode[];
}

interface BusinessGraphics {
    bilderBusinessGraphics: BilderBusinessGraphics
}

interface BilderBusinessGraphics {
    firstImageLeft: FirstImageLeft;
}

interface CategoryNode {
  title: string;
  postsadditionals: Postsadditionals;
  featuredImage: FeaturedImage;
}

interface KINode {
    featuredImage: FeaturedImage;
    categories: Categories;
}

interface FeaturedImage {
  node: Node;
}

interface Categories {
    nodes: CategoryNode[];
  }
  
  interface CategoryNode {
    name: string;
  }

interface Node {
  altText: string;
  title: string;
  sourceUrl: string;
  mediaDetails?: {
    width: number
    height: number
  }
}

interface MediaDetails {
  height: number;
  width: number;
}

interface Postsadditionals {
  customexcerpt: string;
  link: Link;
}

interface Link {
  url: string;
  target: string;
  title: string;
}

export function mapHomeProps(data: IHomeWordpress): IHomeProps {
    console.log(JSON.stringify(data, null, 2))
    const {
        news:{nodes}, 
        kreativ, 
        illustration, 
        businessGraphics, 
        nodeByUri: {landingAboutMe}, 
        ...rest} = data
    const homeProps: IHomeProps = {
        news: {
            image: {
                src: nodes[0].featuredImage.node.sourceUrl,
                title: nodes[0].featuredImage.node.title,
                alt: nodes[0].featuredImage.node.altText,
                layout: "responsive",
                width: nodes[0].featuredImage.node.mediaDetails?.width,
                height: nodes[0].featuredImage.node.mediaDetails?.height,
                sizes: '(min-width:1440) 25vw, (min-width:1140) 33vw, 70vw'
            },
            headline: {
                text: nodes[0].title
            },
            content: nodes[0].postsadditionals.customexcerpt,
            link: {
                href: nodes[0].postsadditionals.link.url,
                label: 'Weiterlesen',
                target: nodes[0].postsadditionals.link.target
            }
        },
        services: {
            images: [
                {
                    src: illustration.nodes[0].featuredImage.node.sourceUrl,
                    alt: illustration.nodes[0].featuredImage.node.altText,
                    title: illustration.nodes[0].featuredImage.node.title,
                    sizes: '(min-width: 768px) 375px, 100vw',
                    link: {
                        href: '/illustration'
                    },
                    hoverOverlay: illustration.nodes[0].categories.nodes[0].name
                },
                {
                    src: businessGraphics.bilderBusinessGraphics.firstImageLeft.sourceUrl,
                    alt: businessGraphics.bilderBusinessGraphics.firstImageLeft.altText,
                    title: businessGraphics.bilderBusinessGraphics.firstImageLeft.title,
                    link: {
                        href: '/business-graphics'
                    },
                    hoverOverlay: 'Business Graphics',
                    sizes: '(min-width: 768px) 375px, 100vw',
                },
                {
                    src: kreativ.nodes[0].featuredImage.node.sourceUrl,
                    alt: kreativ.nodes[0].featuredImage.node.altText,
                    title: kreativ.nodes[0].featuredImage.node.title,
                    link: {
                        href: '/kreativ'
                    },
                    hoverOverlay: kreativ.nodes[0].categories.nodes[0].name,
                    sizes: '(min-width: 768px) 375px, 100vw',
                },
            ],

        },
        welcome: {
            headline: {
                text: landingAboutMe.welcomeHeadline
            },
            text: landingAboutMe.welcomeText
        }

    }

    return homeProps
}