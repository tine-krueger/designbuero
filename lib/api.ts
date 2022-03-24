import { json } from "stream/consumers"

const API_URL = process.env.WP_API_URL


/*@ts-ignore*/
async function fetchAPI(query, { variables } = { variables: {} }) {
    const headers = { 'Content-Type': 'application/json'}
/*@ts-ignore*/
    const result: Response = await fetch('http://localhost:8888/designbuero_backend/graphql/', {
        method: 'POST',
        headers,
        body: JSON.stringify({query, variables})
    })

    const data = await result.json()
    if (data.errors) {
        console.log(data.errors)
        console.log('error details', query, variables)
        throw new Error('Failes to fetch API!')
    }

    return data.data
}

export async function getHomepageData() {
    const data = await fetchAPI(
        `{
            posts(where: {categoryId: 1, orderby: {field: DATE, order: DESC}}, first: 1) {
              nodes {
                id
                title
                postsadditionals {
                    customexcerpt
                    }
                featuredImage {
                    node {
                        altText
                        mediaDetails {
                        file
                        height
                        width
                        }
                        sourceUrl
                    }
                }
              }
            }
        }`
    )
        console.log(data)
    return data.posts
}

export async function getIllustrationData() {
    const data = await fetchAPI(
       ` {
        posts(where: {categoryId: 2, orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              id
              tags {
                edges {
                  node {
                    name
                    tagId
                    slug
                  }
                }
              }
            }
          }
        }
        category(idType: DATABASE_ID, id: 2) {
          categoryId
          name
        }
      }`
    )

    console.log('Illustration data:', data)
    return data
}