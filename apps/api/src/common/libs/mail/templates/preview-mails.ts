import { render } from '@react-email/components'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { EmailConfirmationTemplate } from './email-confirmation.template'
import { OrderCardPendingTemplate } from './order-card-pending.template'
import { OrderCashPlacedTemplate } from './order-cash-placed.template'
import { OrderMailData } from './order-mail.types'
import { OrderPaymentFailedTemplate } from './order-payment-failed.template'
import { OrderPaymentSuccessTemplate } from './order-payment-success.template'
import { ResetPasswordTemplate } from './reset-password.template'
import { TwoFactorDisabledTemplate } from './two-factor-disabled.template'
import { TwoFactorEnabledTemplate } from './two-factor-enabled.template'

const PREVIEW_DOMAIN = 'http://localhost:3000'
const PREVIEW_TOKEN = 'preview-token'
const PREVIEW_ORDERS_URL = `${PREVIEW_DOMAIN}/profile/orders`

const PREVIEW_ORDER: OrderMailData = {
  orderNumber: 1024,
  paymentId: 'cs_test_preview_1024',
  firstName: 'Eugene',
  lastName: 'Doe',
  email: 'eugene@example.com',
  phone: '+1 555 010 1024',
  country: 'USA',
  city: 'New York',
  state: 'NY',
  address: '5th Avenue 100',
  zipCode: '10001',
  currency: 'USD',
  subtotalAmount: 179.98,
  discountAmount: 20,
  taxAmount: 15.99,
  deliveryAmount: 10,
  totalAmount: 185.97,
  items: [
    {
      productName: 'Wireless Headphones',
      quantity: 1,
      unitPrice: 99.99,
      totalPrice: 99.99
    },
    {
      productName: 'Gaming Mouse',
      quantity: 2,
      unitPrice: 39.995,
      totalPrice: 79.99
    }
  ]
}

function savePreview(path: string, html: string): void {
  mkdirSync(join(process.cwd(), 'tmp'), { recursive: true })
  writeFileSync(join(process.cwd(), 'tmp', path), html)
}

async function main(): Promise<void> {
  const emailConfirmationHtml = await render(
    EmailConfirmationTemplate({
      domain: PREVIEW_DOMAIN,
      token: PREVIEW_TOKEN
    })
  )
  const resetPasswordHtml = await render(
    ResetPasswordTemplate({
      domain: PREVIEW_DOMAIN,
      token: PREVIEW_TOKEN
    })
  )
  const cashPlacedHtml = await render(
    OrderCashPlacedTemplate({
      order: PREVIEW_ORDER,
      ordersUrl: PREVIEW_ORDERS_URL
    })
  )
  const cardPendingHtml = await render(
    OrderCardPendingTemplate({
      order: PREVIEW_ORDER,
      paymentUrl: 'https://checkout.stripe.com/pay/cs_test_preview_1024',
      ordersUrl: PREVIEW_ORDERS_URL
    })
  )
  const paymentSuccessHtml = await render(
    OrderPaymentSuccessTemplate({
      order: PREVIEW_ORDER,
      ordersUrl: PREVIEW_ORDERS_URL
    })
  )
  const paymentFailedHtml = await render(
    OrderPaymentFailedTemplate({
      order: PREVIEW_ORDER,
      ordersUrl: PREVIEW_ORDERS_URL
    })
  )
  const twoFactorEnabledHtml = await render(
    TwoFactorEnabledTemplate({
      securityUrl: `${PREVIEW_DOMAIN}/profile/security`
    })
  )
  const twoFactorDisabledHtml = await render(
    TwoFactorDisabledTemplate({
      securityUrl: `${PREVIEW_DOMAIN}/profile/security`,
      signInUrl: `${PREVIEW_DOMAIN}/auth/sign-in`
    })
  )

  savePreview('/email-confirmation.html', emailConfirmationHtml)
  savePreview('/reset-password.html', resetPasswordHtml)
  savePreview('/order-cash-placed.html', cashPlacedHtml)
  savePreview('/order-card-pending.html', cardPendingHtml)
  savePreview('/order-payment-success.html', paymentSuccessHtml)
  savePreview('/order-payment-failed.html', paymentFailedHtml)
  savePreview('/two-factor-enabled.html', twoFactorEnabledHtml)
  savePreview('/two-factor-disabled.html', twoFactorDisabledHtml)

  console.log('Saved previews:')
  console.log('/tmp/email-confirmation.html')
  console.log('/tmp/reset-password.html')
  console.log('/tmp/order-cash-placed.html')
  console.log('/tmp/order-card-pending.html')
  console.log('/tmp/order-payment-success.html')
  console.log('/tmp/order-payment-failed.html')
  console.log('/tmp/two-factor-enabled.html')
  console.log('/tmp/two-factor-disabled.html')
}

void main()
