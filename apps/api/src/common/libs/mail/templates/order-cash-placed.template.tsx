import React from 'react'

import { OrderEmailBaseTemplate } from './order-email.base'
import { OrderMailData } from './order-mail.types'

interface OrderCashPlacedTemplateProps {
  order: OrderMailData
  ordersUrl: string
}

export const OrderCashPlacedTemplate = ({
  order,
  ordersUrl
}: OrderCashPlacedTemplateProps) => {
  return (
    <OrderEmailBaseTemplate
      preview={`Order #${order.orderNumber} confirmed with cash payment`}
      title='Your order is placed'
      description='We have received your order. Payment method is cash, so you can pay when your order is delivered.'
      badgeText='Cash order'
      badgeTone='amber'
      footer='Thanks for shopping with Sift-Shop.'
      note='If anything looks wrong in this order, contact support and include your order number.'
      order={order}
      ordersUrl={ordersUrl}
    />
  )
}
