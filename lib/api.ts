const API_URL = process.env.WP_API_URL as RequestInfo

/*@ts-ignore*/
async function fetchAPI(query, { variables } = { variables: {} }) {
	const headers = { 'Content-Type': 'application/json' }
	/*@ts-ignore*/
	try {
		const result: Response = await fetch(API_URL, {
			method: 'POST',
			headers,
			body: JSON.stringify({ query, variables }),
		})
		const data = await result.json()

		if (!data) {
			console.log(data.errors)
			console.log('error details', query, variables)
			throw new Error('Failes to fetch API!')
		}
		return data.data
	} catch (error) {
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
                  mediaDetails {
                    height
                    width
                  }
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
          events(first: 1) {
            nodes {
              title
            }
          }
          illustration: posts(
            first: 1
            where: {categoryId: 2, imageToFront: true, orderby: {field: DATE, order: DESC}}
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
            where: {categoryId: 16, imageToFront: true, orderby: {field: DATE, order: DESC}}
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
              homeImage {
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
        posts(first: 50, where: {categoryId: ${id}, orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                  altText
                  title
                  mediaDetails {
                    height
                    width
                  }
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

	if (!data) {
		return null
	}
	return data
}

export async function getBusinessGraphicsData() {
	const data = await fetchAPI(
		` {
      page(id: "61", idType: DATABASE_ID) {
        bilderBusinessGraphics {
          homeImage {
            altText
            sourceUrl
            title
            mediaDetails {
              height
              width
            }
          }
        }
        content
        title
      }
      posts(first: 7, where: {categoryId: 14}) {
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
	if (!data) {
		return null
	}

	return data
}

export async function getKreativData() {
	const data = await fetchAPI(
		` {
      events {
        nodes {
          title
          id
          plz
          address
          city
          venueName
          content
          occurrences {
            endTime
            startDate
            startTime
            dateString
          }
          featuredImage {
            node {
              altText
              title
              sourceUrl
            }
          }
        }
      }
      posts(first: 7, where: {categoryId: 15}) {
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
          topMiddleRight {
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
            mediaDetails {
              width
              height
            }
          }
        }
        title
       
      }
    }`
	)
	if (!data) {
		return null
	}

	return data
}

export async function getAboutMeData() {
	const data = await fetchAPI(
		`{
      page(id: "139", idType: DATABASE_ID) {
        title
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

	if (!data) {
		return null
	}
	return data
}

export async function getPageData(pageID: number) {
	const data = await fetchAPI(
		`{
      page(id: "${pageID}", idType: DATABASE_ID) {
        content
        title
      }
    }
     `
	)

	if (!data) {
		return null
	}
	return data
}
