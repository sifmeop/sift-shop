import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  GetNotificationsQuery,
  MarkNotificationsAsReadMutation,
  MarkNotificationsAsReadMutationVariables
} from '~/common/lib/graphql/generated/graphql'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { GET_NOTIFICATIONS_GQL } from './useGetNotificationsQuery'

const MARK_NOTIFICATIONS_AS_READ_GQL = gql(`
  mutation MarkNotificationsAsRead {
    markNotificationsAsRead {
      id
      readAt
    }
  }
`)

export const useMarkNotificationsAsRead = () => {
  const [mutate, { loading: isMutating }] = useMutation<
    MarkNotificationsAsReadMutation,
    MarkNotificationsAsReadMutationVariables
  >(MARK_NOTIFICATIONS_AS_READ_GQL, {
    update: (cache, { data }) => {
      if (!data) return

      cache.updateQuery<GetNotificationsQuery>(
        { query: GET_NOTIFICATIONS_GQL },
        (prev) => {
          if (!prev) return

          return {
            notifications: prev.notifications.map((n) => {
              const isMarkedAsRead = data.markNotificationsAsRead.some(
                (item) => item.id === n.id
              )

              if (isMarkedAsRead) return { ...n, readAt: new Date() }

              return n
            })
          }
        }
      )
    }
  })

  const markNotificationsAsRead = async () => {
    try {
      await mutate()
    } catch (error) {
      handleGraphQLError(error)
    }
  }

  return {
    markNotificationsAsRead,
    isMutating
  }
}
