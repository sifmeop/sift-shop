import { useQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const SEARCH_GQL = gql(`
	query Search($q: String!) {
		search(q: $q) {
			id
			slug
			name
			stock
			discountPercent
			price
			images
		}
	}
`)

export const useSearchQuery = (q: string) => {
  return useQuery(SEARCH_GQL, {
    variables: { q },
    skip: q.length < 3,
    fetchPolicy: 'no-cache'
  })
}
