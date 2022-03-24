import { IPostProps } from "../../components/gallery-group/gallery-wrapper";



export interface IllustrationRootObject {
  posts: Posts;
  category: Category;
}

interface Category {
  categoryId: number;
  name: string;
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
  mediaItemUrl: string;
}

export function mapData(data: IllustrationRootObject): IPostProps[] {
    const posts: IPostProps[] = []
    data.posts.edges.map( edge => {
        const tags: string[] = []
        edge.node.tags.edges.map(edge => tags.push(edge.node.name))
        
        const post: IPostProps = {
            image: {
                src: edge.node.featuredImage.node.mediaItemUrl
            },
            tags: tags,
        }
        posts.push(post)
    })
    return posts
}