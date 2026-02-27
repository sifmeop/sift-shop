import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'
import { GetProductDetailQuery } from '~/common/lib/graphql/generated/graphql'

const GET_PRODUCT_DETAIL_GQL = gql(`
	query GetProductDetail($slug: String!) {
		product(slug: $slug) {
			id
  		slug
  		name
  		description
  		price
  		discountPercent
  		stock
  		isFeatured
  		images
  		specifications
			category {
				slug
				name
			}
			subcategory {
				slug
				name
			}
		}
	}	
`)

export const getProductDetail = async (slug: string) => {
  try {
    return await apolloClient.query<GetProductDetailQuery>({
      query: GET_PRODUCT_DETAIL_GQL,
      variables: { slug }
    })
  } catch {
    return {
      data: null
    }
  }
}
