import { useQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  GetReviewsQuery,
  GetReviewsQueryVariables
} from '~/common/lib/graphql/generated/graphql'

export const GET_REVIEWS_GQL = gql(`
	query GetReviews($productId: String!) {
		reviews(productId: $productId) {
			id
			fullName
			rating
			comment
			userId
			createdAt
		}
	}
`)

export const useGetReviewsQuery = (productId: string) => {
  return useQuery<GetReviewsQuery, GetReviewsQueryVariables>(GET_REVIEWS_GQL, {
    variables: {
      productId
    }
  })
}
