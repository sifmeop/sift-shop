import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { GetReviewsQuery } from '~/common/lib/graphql/generated/graphql'

import { GET_REVIEWS_GQL } from './useGetReviewsQuery'

const UPSERT_REVIEW_GQL = gql(`
	mutation UpsertReview($input: UpsertReviewInput!) {
		upsertReview(input: $input) {
			id
      fullName
			rating
			comment
			userId
			createdAt
		}
	}
`)

export const useUpsertReviewMutation = (productId: string) => {
  return useMutation(UPSERT_REVIEW_GQL, {
    update: (cache, { data }) => {
      if (!cache || !data) return

      cache.updateQuery<GetReviewsQuery>(
        { query: GET_REVIEWS_GQL, variables: { productId } },
        (prev) => {
          if (!prev?.reviews) return prev

          const hasReview = prev.reviews.some(
            ({ id }) => id === data.upsertReview.id
          )

          return {
            reviews: hasReview
              ? prev.reviews.map((review) =>
                  review.id === data.upsertReview.id
                    ? data.upsertReview
                    : review
                )
              : [...prev.reviews, data.upsertReview]
          }
        }
      )
    }
  })
}
