import React from 'react'

import { OrderEmailBaseTemplate } from './order-email.base'
import { OrderMailData } from './order-mail.types'

interface OrderPaymentSuccessTemplateProps {
  order: OrderMailData
  ordersUrl: string
}

export const OrderPaymentSuccessTemplate = ({
  order,
  ordersUrl
}: OrderPaymentSuccessTemplateProps) => {
  return (
    <OrderEmailBaseTemplate
      preview={`Payment successful for order #${order.orderNumber}`}
      title='Payment successful'
      description='Your card payment was processed successfully. We are preparing your order now.'
      badgeText='Paid'
      badgeTone='green'
      footer='We will send updates as your order moves to the next stages.'
      note='Keep this email for your payment and order reference.'
      order={order}
      ordersUrl={ordersUrl}
    />
  )
}
