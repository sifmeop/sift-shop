import React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

import { OrderMailData } from './order-mail.types'

type BadgeTone = 'green' | 'amber' | 'red' | 'slate'

interface OrderEmailBaseTemplateProps {
  preview: string
  title: string
  description: string
  footer: string
  note?: string
  badgeText: string
  badgeTone: BadgeTone
  actionLabel?: string
  actionUrl?: string
  order: OrderMailData
  ordersUrl: string
}

const badgeClassByTone: Record<BadgeTone, string> = {
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-200 text-slate-700'
}

const normalizeAmount = (value: number | string): number | null => {
  const parsed = typeof value === 'string' ? Number(value) : value

  if (Number.isNaN(parsed)) {
    return null
  }

  return parsed
}

const formatAmount = (value: number | string, currency: string): string => {
  const normalized = normalizeAmount(value)

  if (normalized === null) {
    return `${value} ${currency}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(normalized)
}

export const OrderEmailBaseTemplate = ({
  preview,
  title,
  description,
  footer,
  note,
  badgeText,
  badgeTone,
  actionLabel,
  actionUrl,
  order,
  ordersUrl
}: OrderEmailBaseTemplateProps) => {
  const fullName = `${order.firstName} ${order.lastName}`

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className='bg-slate-100 py-10 font-sans'>
          <Container className='mx-auto max-w-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
            <Section className='bg-black py-4 text-center'>
              <Text className='m-0 text-base font-black uppercase tracking-[0.22em] text-white'>
                Sift-Shop
              </Text>
            </Section>

            <Section className='p-8 pt-7 text-center'>
              <Text
                className={`m-0 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${badgeClassByTone[badgeTone]}`}>
                {badgeText}
              </Text>
              <Heading className='m-0 mt-4 text-3xl font-bold leading-tight text-slate-900'>
                {title}
              </Heading>
              <Text className='mb-0 mt-4 text-base leading-7 text-slate-600'>
                {description}
              </Text>
            </Section>

            <Section className='mx-8 rounded-xl border border-slate-200 bg-slate-50 p-6 max-w-[calc(100%-4rem)]'>
              <Text className='m-0 text-sm leading-6 text-slate-700'>
                <strong>Order #{order.orderNumber}</strong>
                <br />
                Payment ID: {order.paymentId}
              </Text>

              <Hr className='my-5 border-slate-200' />

              <table className='w-full border-collapse text-sm'>
                <thead>
                  <tr>
                    <th className='border-b border-slate-200 pb-2 text-left text-xs uppercase tracking-[0.1em] text-slate-500'>
                      Item
                    </th>
                    <th className='border-b border-slate-200 pb-2 text-right text-xs uppercase tracking-[0.1em] text-slate-500'>
                      Qty
                    </th>
                    <th className='border-b border-slate-200 pb-2 text-right text-xs uppercase tracking-[0.1em] text-slate-500'>
                      Price
                    </th>
                    <th className='border-b border-slate-200 pb-2 text-right text-xs uppercase tracking-[0.1em] text-slate-500'>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={`${item.productName}-${item.unitPrice}`}>
                      <td className='border-b border-slate-200 py-2 text-left text-sm text-slate-700'>
                        {item.productName}
                      </td>
                      <td className='border-b border-slate-200 py-2 text-right text-sm text-slate-700'>
                        {item.quantity}
                      </td>
                      <td className='border-b border-slate-200 py-2 text-right text-sm text-slate-700'>
                        {formatAmount(item.unitPrice, order.currency)}
                      </td>
                      <td className='border-b border-slate-200 py-2 text-right text-sm font-semibold text-slate-900'>
                        {formatAmount(item.totalPrice, order.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Section className='pt-4'>
                <Text className='m-0 text-sm leading-7 text-slate-700'>
                  Subtotal:{' '}
                  <strong>
                    {formatAmount(order.subtotalAmount, order.currency)}
                  </strong>
                  <br />
                  Discount:{' '}
                  <strong>
                    {formatAmount(order.discountAmount, order.currency)}
                  </strong>
                  <br />
                  Delivery:{' '}
                  <strong>
                    {formatAmount(order.deliveryAmount, order.currency)}
                  </strong>
                  <br />
                  Tax:{' '}
                  <strong>
                    {formatAmount(order.taxAmount, order.currency)}
                  </strong>
                  <br />
                  Total:{' '}
                  <strong>
                    {formatAmount(order.totalAmount, order.currency)}
                  </strong>
                </Text>
              </Section>

              <Hr className='my-5 border-slate-200' />

              <Text className='m-0 text-sm leading-6 text-slate-700'>
                <strong>{fullName}</strong>
                <br />
                {order.email}
                <br />
                {order.phone}
                <br />
                {order.country}, {order.city}
                {order.state ? `, ${order.state}` : ''}
                <br />
                {order.address}, {order.zipCode}
              </Text>

              {(actionLabel && actionUrl) || ordersUrl ? (
                <Section className='pt-6 text-center'>
                  {actionLabel && actionUrl ? (
                    <Button
                      href={actionUrl}
                      className='rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white no-underline'>
                      {actionLabel}
                    </Button>
                  ) : null}

                  <Link
                    href={ordersUrl}
                    className='mt-4 block text-sm font-medium leading-6 text-indigo-600 underline'>
                    View orders
                  </Link>
                </Section>
              ) : null}
            </Section>

            <Hr className='mx-8 my-8 border-slate-200' />

            <Text className='mx-8 mb-3 mt-0 text-xs leading-6 text-slate-500'>
              {footer}
            </Text>
            {note ? (
              <Text className='mx-8 mb-8 mt-0 text-xs leading-6 text-slate-500'>
                {note}
              </Text>
            ) : (
              <Section className='pb-8' />
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
