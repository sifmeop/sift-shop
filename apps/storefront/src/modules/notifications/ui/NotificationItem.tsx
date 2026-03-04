import { NotificationEntity } from '~/common/lib/graphql/generated/graphql'
import { Show } from '~/common/ui/Show'
import { cn } from '~/common/utils/cn'

import { formatNotification } from '../config/notification-templates'
import { formatRelativeTime } from '../utils/formatRelativeTime'

type NotificationItemProps = NotificationEntity

export const NotificationItem = ({
  data,
  type,
  readAt,
  createdAt
}: NotificationItemProps) => {
  const {
    icon: Icon,
    iconClassName,
    iconContainerClassName,
    title,
    body
  } = formatNotification(type, data)
  const time = formatRelativeTime(createdAt)

  return (
    <div
      className={cn('flex gap-4 px-4 py-3 transition-colors duration-300', {
        'bg-muted': !readAt
      })}>
      <div
        className={cn(
          'rounded-xl border border-border size-11 shrink-0 grid place-items-center',
          iconContainerClassName
        )}>
        <Icon className={cn('size-[60%]', iconClassName)} />
      </div>
      <div>
        <h4 className='font-semibold'>{title}</h4>
        <Show when={!!body}>
          <p>{body}</p>
        </Show>
        <span className='text-muted-foreground'>{time}</span>
      </div>
    </div>
  )
}
