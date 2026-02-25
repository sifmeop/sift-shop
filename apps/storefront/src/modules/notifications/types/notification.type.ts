export const NotificationType = {
  ORDER_PLACED: 'ORDER_PLACED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  TWO_FACTOR_ENABLED: 'TWO_FACTOR_ENABLED',
  TWO_FACTOR_DISABLED: 'TWO_FACTOR_DISABLED'
} as const

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType]
