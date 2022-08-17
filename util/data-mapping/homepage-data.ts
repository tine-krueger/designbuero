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
    homeImage: FirstImageLeft;
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

    const {
        news:{nodes}, 
        kreativ, 
        illustration, 
        businessGraphics, 
        nodeByUri: {landingAboutMe}, 
        ...rest} = data
    const homeProps: IHomeProps = {
        news: nodes[0] ?  {
            image: nodes[0].featuredImage ? {
                src: nodes[0].featuredImage.node.sourceUrl,
                title: nodes[0].featuredImage.node.title,
                alt: nodes[0].featuredImage.node.altText,
                layout: "responsive",
                width: nodes[0].featuredImage.node.mediaDetails?.width,
                height: nodes[0].featuredImage.node.mediaDetails?.height,
                sizes: '(min-width:1440) 25vw, (min-width:1140) 33vw, 70vw'
            } : null,
            headline: {
                text: nodes[0].title
            },
            content: nodes[0].postsadditionals.customexcerpt ? nodes[0].postsadditionals.customexcerpt : null,
            link:  nodes[0].postsadditionals.link ? {
                href: nodes[0].postsadditionals.link.url,
                label: 'Weiterlesen',
                target: nodes[0].postsadditionals.link.target
            } : null
        } : null,
        services: {
            images: [
                {
                    src: illustration.nodes[0] ? illustration.nodes[0].featuredImage.node.sourceUrl : '/assets/img/fallback.jpg',
                    sizes: '(min-width: 768px) 375px, 100vw',
                    link: {
                        href: '/illustration'
                    },
                    hoverOverlay: illustration.nodes[0] ? illustration.nodes[0].categories.nodes[0].name : 'Illustration'
                },
                {
                    src: businessGraphics.bilderBusinessGraphics.homeImage ? businessGraphics.bilderBusinessGraphics.homeImage.sourceUrl : '/assets/img/fallback.jpg',
                    // src: '/assets/img/bg_hero.jpg',
                    link: {
                        href: '/business-graphics'
                    },
                    hoverOverlay: 'Business Graphics',
                    sizes: '(min-width: 768px) 375px, 100vw',
                    objectFit:'contain'
                },
                {
                    src: kreativ.nodes[0] ? kreativ.nodes[0].featuredImage.node.sourceUrl : '/assets/img/fallback.jpg' ,
                    link: {
                        href: '/kreativ'
                    },
                    hoverOverlay: kreativ.nodes[0] ? kreativ.nodes[0].categories.nodes[0].name : 'Kreativ',
                    sizes: '(min-width: 768px) 375px, 100vw',
                },
            ],

        },
        welcome: landingAboutMe ? {
            headline: landingAboutMe.welcomeHeadline ? {
                text: landingAboutMe.welcomeHeadline 
            } : null,
            text: landingAboutMe.welcomeText ? landingAboutMe.welcomeText : null
        } : null

    }

    return homeProps
}