import { useQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { GetNotificationsQuery } from '~/common/lib/graphql/generated/graphql'

export const GET_NOTIFICATIONS_GQL = gql(`
	query GetNotifications {
		notifications {
			id
			data
			type
			readAt
			createdAt
		}
	}
`)

export const useGetNotificationsQuery = () => {
  return useQuery<GetNotificationsQuery>(GET_NOTIFICATIONS_GQL)
}
