const API_URL = process.env.WP_API_URL as RequestInfo


/*@ts-ignore*/
async function fetchAPI(query, { variables } = { variables: {} }) {
    const headers = { 'Content-Type': 'application/json'}
/*@ts-ignore*/
    try {
      const result: Response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({query, variables})
        
      })
      const data = await result.json()

      if (!data) {
        console.log(data.errors)
        console.log('error details', query, variables)
        throw new Error('Failes to fetch API!')
      }
      return data.data
  } catch(error) {
    console.log(error)
  }  
}

export async function getHomepageData() {
    const data = await fetchAPI(
        `{
          news: posts(
            first: 1
            where: {categoryId: 18, orderby: {field: DATE, order: DESC}}
          ) {
            nodes {
              featuredImage {
                node {
                  altText
                  sourceUrl
                  title
                }
              }
              postsadditionals {
                customexcerpt
                link {
                  target
                  url
                }
              }
              title
            }
          }
          illustration: posts(
            first: 1
            where: {categoryId: 2, orderby: {field: DATE, order: DESC}}
          ) {
            nodes {
              featuredImage {
                node {
                  altText
                  sourceUrl
                  title
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
          kreativ: posts(
            first: 1
            where: {categoryId: 16, orderby: {field: DATE, order: DESC}}
          ) {
            nodes {
              featuredImage {
                node {
                  altText
                  sourceUrl
                  title
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
          businessGraphics: page(id: "61" ,idType: DATABASE_ID) {
            bilderBusinessGraphics {
              firstImageLeft {
                altText
                title
                sourceUrl
              }
            }
          }
          nodeByUri(uri: "/") {
            ... on Page {
              landingAboutMe {
                welcomeHeadline
                welcomeText
              }
            }
          }
        }`
    )
    if (!data) {
      return null
    }
    return data
}

export async function getPortfolioDataByCatId(id: number) {
    const data = await fetchAPI(
       ` {
        posts(where: {categoryId: ${id}, orderby: {field: DATE, order: DESC}}) {
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
        category(idType: DATABASE_ID, id: ${id}) {
          categoryId
          name
          description
          catAdditionalFields {
            categoryDescription2
          }
        }
      }`
    )

    if(!data) {
      return null
    }
    return data
}

export async function getBusinessGraphicsData() {
  const data = await fetchAPI(
     ` {
      page(id: "61", idType: DATABASE_ID) {
        bilderBusinessGraphics {
          firstImageLeft {
            altText
            sourceUrl
            title
            mediaDetails {
              height
              width
            }
          }
          firstImageRight {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
            title
          }
          secondImageLeft {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
            title
          }
          secondImageRight {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
            title
          }
        }
        content
        title
      }
      posts(first: 10, where: {categoryId: 14}) {
        nodes {
          testimonials {
            company
            name
            quote
            image {
              altText
              title
              sourceUrl(size: MEDIUM)
            }
          }
        }
      }
    }`
  )
  if(!data) {
    return null
  }
  console.log('Business-Gaphics data:', JSON.stringify(data, null, 2))
  return data
}

export async function getKreativData() {
  const data = await fetchAPI(
     ` {
      posts(first: 10, where: {categoryId: 15}) {
        nodes {
          testimonials {
            name
            quote
          }
        }
      }
      page(id: "102", idType: DATABASE_ID) {
        bilderKreativ {
          bottomLeft {
            altText
            sourceUrl
            title
          }
          bottomRight {
            altText
            sourceUrl
            title
          }
          topCenter {
            altText
            sourceUrl
            title
          }
          topLeft {
            altText
            sourceUrl
            title
          }
          topRight {
            altText
            sourceUrl
            title
          }
        }
        textGruppeKreativ {
          textfield1
          textfield2
          textfield3
        }
        imageText {
          text
          image {
            altText
            title
            sourceUrl
          }
        }
        title
      }
    }`
  )
  if(!data) {
    return null
  }
  console.log('kreativ data:', JSON.stringify(data, null, 2))
  return data
}

export async function getAboutMeData() {
  const data = await fetchAPI(
     `{
      page(id: "139", idType: DATABASE_ID) {
        contentAboutMe {
          textImage1 {
            text
            image {
              altText
              sourceUrl
              mediaDetails {
                width
                height
              }
              title
            }
          }
          textImage2 {
            text
            image {
              altText
              mediaDetails {
                height
                width
              }
              sourceUrl
              title
            }
          }
          textImage3 {
            text
            image {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
              title
            }
          }
        }
      }
    }
     `
  )

  if(!data) {
    return null
  }
  return data
}