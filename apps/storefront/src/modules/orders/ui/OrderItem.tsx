import { useState } from 'react'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

import { day } from '~/common/lib/dayjs'
import {
  OrderEntity,
  OrderStatus
} from '~/common/lib/graphql/generated/graphql'
import { cn } from '~/common/utils/cn'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'

type OrderItemProps = OrderEntity

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    [OrderStatus.Pending]: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-700'
    },
    [OrderStatus.Paid]: {
      label: 'Paid',
      className: 'bg-green-100 text-green-700'
    },
    [OrderStatus.Cancelled]: {
      label: 'Cancelled',
      className: 'bg-red-100 text-red-700'
    },
    [OrderStatus.Processing]: {
      label: 'Processing',
      className: 'bg-purple-100 text-purple-700'
    }
  }

export const OrderItem = ({
  number,
  status,
  firstName,
  lastName,
  email,
  phone,
  subtotalAmount,
  discountAmount,
  taxAmount,
  deliveryAmount,
  totalAmount,
  createdAt,
  address,
  city,
  state,
  zipCode,
  country,
  items
}: OrderItemProps) => {
  const [open, setOpen] = useState(false)

  const config = statusConfig[status]

  return (
    <div className='flex flex-col gap-5 rounded-2xl border bg-white p-4 shadow-xs transition hover:shadow-sm sm:gap-6 sm:p-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>
            Order #{number}
          </p>
          <p className='text-xs text-muted-foreground'>
            {day(createdAt).format('D MMM YYYY, HH:mm')}
          </p>
        </div>

        <div className='flex items-center justify-between gap-3 sm:justify-start'>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium',
              config.className
            )}>
            {config.label}
          </span>
          <button
            onClick={() => setOpen(!open)}
            className='rounded-lg p-2 transition hover:bg-muted'>
            <ChevronDown
              className={cn(
                'size-4 transition-transform duration-300',
                open && 'rotate-180'
              )}
            />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6'>
        <div className='space-y-4'>
          <div className='text-sm'>
            <p className='font-semibold text-base'>
              {firstName} {lastName}
            </p>
            <p className='text-muted-foreground'>{email}</p>
            <p className='text-muted-foreground'>{phone}</p>
          </div>

          <div className='rounded-xl border border-border/50 bg-muted/30 p-3 text-sm'>
            <p className='font-medium mb-1'>Delivery Address</p>
            <p className='text-muted-foreground leading-relaxed'>
              {country}, {city}, {state ? state + ', ' : ''} {address},{' '}
              {zipCode}
            </p>
          </div>
        </div>

        <div className='flex flex-col justify-between'>
          <div className='space-y-1 text-sm'>
            <p className='flex justify-between'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span>{formatPrice(subtotalAmount)}</span>
            </p>
            {discountAmount > 0 && (
              <p className='flex justify-between text-emerald-600 font-medium'>
                <span>Discount</span>
                <span>-{formatPrice(discountAmount)}</span>
              </p>
            )}
            <p className='flex justify-between'>
              <span className='text-muted-foreground'>Tax</span>
              <span>{formatPrice(taxAmount)}</span>
            </p>
            <p className='flex justify-between'>
              <span className='text-muted-foreground'>Delivery</span>
              <span>
                {deliveryAmount === 0 ? 'Free' : formatPrice(deliveryAmount)}
              </span>
            </p>
          </div>

          <div className='flex items-end justify-between border-t border-dashed pt-4'>
            <span className='text-sm font-medium'>Total</span>
            <p className='text-lg font-bold tracking-tight sm:text-xl'>
              {formatPrice(totalAmount)}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='items'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className='overflow-hidden'>
            <div className='space-y-4 border-t pt-5 sm:pt-6'>
              <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Items in order
              </p>
              <div className='space-y-3'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='group flex items-center gap-3 sm:gap-4'>
                    {item.product.images?.[0] && (
                      <Image
                        width={56}
                        height={56}
                        src={getImageUrl(item.product.images[0])}
                        alt={item.product.name}
                        className='rounded-lg border bg-muted/20 object-cover'
                      />
                    )}
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-sm truncate'>
                        {item.productName}
                      </p>
                      <p className='text-xs text-muted-foreground font-mono'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className='text-sm font-semibold'>
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
