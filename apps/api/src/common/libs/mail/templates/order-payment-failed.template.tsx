import React from 'react'

import { OrderEmailBaseTemplate } from './order-email.base'
import { OrderMailData } from './order-mail.types'

interface OrderPaymentFailedTemplateProps {
  order: OrderMailData
  ordersUrl: string
}

export const OrderPaymentFailedTemplate = ({
  order,
  ordersUrl
}: OrderPaymentFailedTemplateProps) => {
  return (
    <OrderEmailBaseTemplate
      preview={`Payment failed for order #${order.orderNumber}`}
      title='Payment was not successful'
      description='We could not complete payment for this order. The order was cancelled, and no charge was captured.'
      badgeText='Payment failed'
      badgeTone='red'
      footer='You can place a new order any time from your account.'
      note='If you believe this is an error, contact support and include your order number.'
      order={order}
      ordersUrl={ordersUrl}
    />
  )
}
