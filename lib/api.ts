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