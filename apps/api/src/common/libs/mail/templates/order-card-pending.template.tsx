import React from 'react'

import { OrderEmailBaseTemplate } from './order-email.base'
import { OrderMailData } from './order-mail.types'

interface OrderCardPendingTemplateProps {
  order: OrderMailData
  ordersUrl: string
  paymentUrl: string
}

export const OrderCardPendingTemplate = ({
  order,
  ordersUrl,
  paymentUrl
}: OrderCardPendingTemplateProps) => {
  return (
    <OrderEmailBaseTemplate
      preview={`Complete card payment for order #${order.orderNumber}`}
      title='Payment is pending'
      description='Your order is created, but card payment is not completed yet. Please finish checkout to confirm your order.'
      badgeText='Card pending'
      badgeTone='slate'
      actionLabel='Complete payment'
      actionUrl={paymentUrl}
      footer='We reserve stock for a limited time while payment is pending.'
      note='If payment is not completed in time, this order may be cancelled automatically.'
      order={order}
      ordersUrl={ordersUrl}
    />
  )
}
