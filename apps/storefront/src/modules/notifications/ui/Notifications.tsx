'use client'

import { Fragment } from 'react/jsx-runtime'

import { Bell, BellDotIcon, BellIcon, XIcon } from 'lucide-react'

import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
import { Button } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '~/common/ui/drawer'
import { Separator } from '~/common/ui/separator'
import { Show } from '~/common/ui/show'
import { Spinner } from '~/common/ui/spinner'

import { useGetNotificationsQuery } from '../hooks/useGetNotificationsQuery'

import { MarkAllButton } from './MarkAllButton'
import { NotificationItem } from './NotificationItem'

export const Notifications = () => {
  const isAuthenticated = useIsAuthenticated()
  const { data, loading, error } = useGetNotificationsQuery()
  const notifications = data?.notifications

  const hasUnReadNotifications =
    notifications && notifications.some((n) => !n.readAt)

  const Icon = hasUnReadNotifications ? BellDotIcon : BellIcon

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild disabled={!isAuthenticated}>
        <Button variant='ghost' className='size-11.25 relative'>
          <Icon
            className='size-6.5 [&>circle]:stroke-red-500 [&>circle]:fill-red-500'
            strokeWidth={1.5}
          />
          <Show when={loading}>
            <Spinner
              className='absolute top-1.5 right-2.5 stroke-red-500 size-3.5'
              strokeWidth={3}
            />
          </Show>
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined} className='rounded-none!'>
        <DrawerHeader className='border-b border-b-border flex flex-row items-center justify-between py-2'>
          <DrawerTitle className='text-base'>Notifications</DrawerTitle>
          <DrawerClose asChild>
            <Button variant='destructive' className='size-8'>
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className='flex-1 overflow-y-auto no-scrollbar'>
          <Show when={loading}>
            <div className='grid place-items-center h-full'>
              <CenterLoader />
            </div>
          </Show>
          <Show when={!!error || (notifications && notifications.length === 0)}>
            <div className='flex flex-col items-center justify-center h-full gap-2'>
              <Bell className='size-8 text-muted-foreground/50' />
              <p className='text-muted-foreground text-sm'>
                No notifications yet
              </p>
            </div>
          </Show>
          <Show when={notifications && notifications.length > 0}>
            <div>
              {notifications?.map((notification, index) => (
                <Fragment key={notification.id}>
                  <NotificationItem {...notification} />
                  {index !== notifications.length - 1 && <Separator />}
                </Fragment>
              ))}
            </div>
          </Show>
        </div>
        <MarkAllButton />
      </DrawerContent>
    </Drawer>
  )
}
