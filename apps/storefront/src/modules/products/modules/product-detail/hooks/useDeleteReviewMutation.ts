import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { GetReviewsQuery } from '~/common/lib/graphql/generated/graphql'

import { GET_REVIEWS_GQL } from './useGetReviewsQuery'

const DELETE_REVIEW_GQL = gql(`
	mutation DeleteReview($id: ID!) {
		deleteReview(id: $id)
	}
`)

export const useDeleteReviewMutation = (productId: string) => {
  return useMutation(DELETE_REVIEW_GQL, {
    update: (cache, { data }, { variables }) => {
      if (!cache || !data || !variables) return

      cache.updateQuery<GetReviewsQuery>(
        { query: GET_REVIEWS_GQL, variables: { productId } },
        (prev) => {
          if (!prev?.reviews) return prev

          return {
            reviews: prev.reviews.filter(({ id }) => id !== variables.id)
          }
        }
      )
    }
  })
}
