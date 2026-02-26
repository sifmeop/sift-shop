import {
  KeyRound,
  LucideIcon,
  ShieldCheck,
  ShieldOff,
  ShoppingBag,
  XCircle
} from 'lucide-react'

import { formatPrice } from '~/common/utils/formatPrice'

import { NotificationType } from '../types/notification.type'

interface NotificationOrderBody {
  orderId: string
  orderNumber: string
  totalAmount: string
}

export interface FormatNotificationReturn {
  icon: LucideIcon
  iconClassName: string
  iconContainerClassName: string
  title: string
  body: string
}

const notificationTemplates: Record<
  NotificationType,
  (data: NotificationOrderBody) => FormatNotificationReturn
> = {
  ORDER_PLACED: (data) => ({
    icon: ShoppingBag,
    iconClassName: 'text-green-500',
    iconContainerClassName: 'bg-green-500/10 border-green-500/20',
    title: 'Order Confirmed',
    body: `Your order #${data.orderNumber} is confirmed. \n Total: ${formatPrice(data.totalAmount)}`
  }),
  ORDER_CANCELLED: (data) => ({
    icon: XCircle,
    iconClassName: 'text-red-500',
    iconContainerClassName: 'bg-red-500/10 border-red-500/20',
    title: 'Order Cancelled',
    body: `Order #${data.orderNumber} has been cancelled. If this was a mistake, please contact support`
  }),
  PASSWORD_CHANGED: () => ({
    icon: KeyRound,
    iconClassName: 'text-blue-500',
    iconContainerClassName: 'bg-blue-500/10 border-blue-500/20',
    title: 'Password Updated',
    body: 'Your password was changed. If you did not do this, secure your account immediately'
  }),
  TWO_FACTOR_ENABLED: () => ({
    icon: ShieldCheck,
    iconClassName: 'text-green-500',
    iconContainerClassName: 'bg-green-500/10 border-green-500/20',
    title: 'Two-Factor Authentication On',
    body: 'Your account is now protected with two-factor authentication'
  }),
  TWO_FACTOR_DISABLED: () => ({
    icon: ShieldOff,
    iconClassName: 'text-yellow-500',
    iconContainerClassName: 'bg-yellow-500/10 border-yellow-500/20',
    title: 'Two-Factor Authentication Off',
    body: 'Two-factor authentication has been disabled'
  })
}

export const formatNotification = (
  type: NotificationType,
  data: NotificationOrderBody
) => {
  return notificationTemplates[type](data)
}
