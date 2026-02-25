import { useEffect } from 'react'

import { useApolloClient } from '@apollo/client/react'
import PusherClient from 'pusher-js'

import { env } from '~/common/constants/env'
import { NotificationEntity } from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'
import { GET_CART_GQL } from '~/modules/cart'
import {
  GET_NOTIFICATIONS_GQL,
  NotificationType
} from '~/modules/notifications'

export const PusherProvider = ({ children }: React.PropsWithChildren) => {
  const userId = useUserStore((state) => state.user?.id)
  const client = useApolloClient()

  useEffect(() => {
    if (!userId) return

    const pusher = new PusherClient(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER
    })

    pusher.connection.bind('error', (error: unknown) => {
      console.error('[Pusher] Connection error:', error)
    })

    const channelName = `user-${userId}`

    const channel = pusher.subscribe(channelName)

    channel.bind('notification', (data: NotificationEntity) => {
      client.cache.updateQuery({ query: GET_NOTIFICATIONS_GQL }, (cache) => ({
        notifications: cache?.notifications
          ? [data, ...cache.notifications]
          : [data]
      }))

      if (data.type === NotificationType.ORDER_PLACED) {
        client.cache.writeQuery({ query: GET_CART_GQL, data: { cart: [] } })
      }
    })

    channel.bind('order', () => {
      client.cache.evict({ fieldName: 'orders' })
      client.cache.gc()
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(channelName)
      pusher.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return <>{children}</>
}
