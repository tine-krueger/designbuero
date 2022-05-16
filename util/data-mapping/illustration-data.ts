import { DEFAULT_ECDH_CURVE } from "tls";
import { IPostProps } from "../../components/gallery-group/gallery-wrapper";
import { IIllustrationProps } from "../../pages/illustration";



export interface IWordpressPortfolioProps {
  posts: Posts;
  category: Category;
}

interface Category {
  categoryId: number;
  name: string;
  description: string
  catAdditionalFields: CatAdditionalFields
}

interface CatAdditionalFields {
  categoryDescription2: string
}

interface Posts {
  edges: Edge2[];
}

interface Edge2 {
  node: Node3;
}

interface Node3 {
  featuredImage: FeaturedImage;
  id: string;
  tags: Tags;
}

interface Tags {
  edges: Edge[];
}

interface Edge {
  node: Node2;
}

interface Node2 {
  name: string;
  tagId: number;
  slug: string;
}

interface FeaturedImage {
  node: Node;
}

interface Node {
  sourceUrl: string;
  mediaDetails: IMediaDetails
}

interface IMediaDetails {
  width: number
  height: number
}

export function mapPortfolioData(data: IWordpressPortfolioProps): IIllustrationProps {
    const posts: IPostProps[] = []
    data.posts.edges.map( edge => {
        if ( edge.node.featuredImage === null) {
          return
        }
        const tags: string[] = []
        edge.node.tags.edges.map(edge => tags.push(edge.node.name))
  
        

        const post: IPostProps = {
            image: {
                src: edge.node.featuredImage.node.sourceUrl,
                width: edge.node.featuredImage.node.mediaDetails.width,
                height: edge.node.featuredImage.node.mediaDetails.height
            },
            tags: tags,
        }
        posts.push(post)
    })


    const portfolioProps: IIllustrationProps = {
      posts: posts,
      category: {
        name: data.category.name,
        descriptions: [
          data.category.description,
          data.category.catAdditionalFields.categoryDescription2
        ]
      }
    }


    return portfolioProps
}