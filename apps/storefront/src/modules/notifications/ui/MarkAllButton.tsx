import { Button } from '~/common/ui/button'
import { DrawerFooter } from '~/common/ui/drawer'

import { useGetNotificationsQuery } from '../hooks/useGetNotificationsQuery'
import { useMarkNotificationsAsRead } from '../hooks/useMarkNotificationsAsRead'

export const MarkAllButton = () => {
  const { data } = useGetNotificationsQuery()
  const { markNotificationsAsRead, isMutating } = useMarkNotificationsAsRead()

  const unreadIds =
    data?.notifications?.filter((n) => !n.readAt).map((n) => n.id) ?? []

  if (!unreadIds.length) return

  return (
    <DrawerFooter className='border-t border-t-border'>
      <Button
        variant='destructive'
        isLoading={isMutating}
        loadingMode='spinner-only'
        onClick={markNotificationsAsRead}>
        Mark all as read
      </Button>
    </DrawerFooter>
  )
}
