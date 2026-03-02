import { useQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  GetRelatedProductsQuery,
  GetRelatedProductsQueryVariables
} from '~/common/lib/graphql/generated/graphql'

const GET_RELATED_PRODUCTS_GQL = gql(`
	query GetRelatedProducts($slug: String!, $productId: String!) {
		relatedProducts(slug: $slug, productId: $productId) {
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
		}
	}
`)

export const useGetRelatedProductsQuery = (slug: string, productId: string) => {
  return useQuery<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>(
    GET_RELATED_PRODUCTS_GQL,
    {
      variables: {
        slug,
        productId
      }
    }
  )
}
