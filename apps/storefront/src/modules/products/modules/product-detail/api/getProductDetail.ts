import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { makeServerClient } from '~/common/lib/graphql/apollo-server-client'
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
			isPurchased
			rating
			reviewCount
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

export const getProductDetail = async (
  slug: string,
  cookieStore: ReadonlyRequestCookies
) => {
  try {
    const client = await makeServerClient(cookieStore)

    return await client.query<GetProductDetailQuery>({
      query: GET_PRODUCT_DETAIL_GQL,
      variables: { slug },
      fetchPolicy: 'no-cache'
    })
  } catch {
    return {
      data: null
    }
  }
}
