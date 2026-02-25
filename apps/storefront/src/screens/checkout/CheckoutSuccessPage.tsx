'use client'

import { useEffect } from 'react'

import {
  CheckCircle2Icon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  XCircleIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { day } from '~/common/lib/dayjs'
import {
  OrderEntity,
  OrderStatus
} from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Container } from '~/common/ui/container'
import { cn } from '~/common/utils/cn'
import { formatPrice } from '~/common/utils/formatPrice'

const STATUS_DETAILS = {
  PENDING: {
    label: 'Awaiting Payment',
    icon: ClockIcon,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    description:
      'Please complete your payment. The order will be cancelled automatically in 30 minutes.'
  },
  PAID: {
    label: 'Payment Received',
    icon: CheckCircle2Icon,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    description:
      'We have received your payment and will start processing your order shortly.'
  },
  PROCESSING: {
    label: 'Order Processing',
    icon: PackageIcon,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'Your order is confirmed and is being prepared for shipment.'
  },
  CANCELLED: {
    label: 'Order Cancelled',
    icon: XCircleIcon,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    description:
      'This order was cancelled. If you believe this is an error, please contact support.'
  }
}

interface CheckoutSuccessPageProps {
  order: OrderEntity
}

export const CheckoutSuccessPage = ({ order }: CheckoutSuccessPageProps) => {
  const router = useRouter()
  const status = order.status
  const config = STATUS_DETAILS[status]

  useEffect(() => {
    if (status !== OrderStatus.Pending) return

    const interval = setInterval(router.refresh, 5000)

    return () => clearInterval(interval)
  }, [status, router])

  return (
    <Container
      bgColor='white'
      innerClassName='max-w-4xl! mx-auto p-4 md:p-8 space-y-6'>
      <div
        className={cn(
          'rounded-3xl border p-6 md:p-10 flex flex-col items-center text-center gap-4 transition-all',
          config.color
        )}>
        <config.icon className='size-12 animate-pulse' />
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>{config.label}</h1>
          <p className='max-w-xs mx-auto text-sm opacity-90'>
            {config.description}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white border rounded-3xl p-6 space-y-4'>
          <h2 className='font-semibold flex items-center gap-2 text-foreground'>
            <MapPinIcon className='size-4 text-muted-foreground' />
            Shipping Address
          </h2>
          <div className='text-sm space-y-1 text-muted-foreground'>
            <p className='font-medium text-foreground'>
              {order.firstName} {order.lastName}
            </p>
            <p>
              {order.country}, {order.city}
            </p>
            <p>
              {order.address}, {order.zipCode}
            </p>
            <div className='pt-2 flex flex-col gap-1 border-t mt-3 border-dashed'>
              <span className='flex items-center gap-2'>
                <MailIcon className='size-3' /> {order.email}
              </span>
              <span className='flex items-center gap-2'>
                <PhoneIcon className='size-3' /> {order.phone}
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white border rounded-3xl p-6 space-y-4'>
          <h2 className='font-semibold flex items-center gap-2 text-foreground'>
            <PackageIcon className='size-4 text-muted-foreground' />
            Order Summary
          </h2>
          <div className='space-y-3'>
            {order.items.map((item) => (
              <div
                key={item.id}
                className='flex justify-between items-start text-sm'>
                <span className='text-muted-foreground line-clamp-2 max-w-45'>
                  {item.productName}{' '}
                  <b className='text-foreground font-medium'>
                    × {item.quantity}
                  </b>
                </span>
                <span className='font-medium text-foreground'>
                  {formatPrice(item.totalPrice)}
                </span>
              </div>
            ))}
            <div className='pt-3 border-t border-dashed space-y-1'>
              <div className='flex justify-between items-center'>
                <span className='text-muted-foreground font-medium'>
                  Total Amount
                </span>
                <span className='font-bold text-xl tracking-tight'>
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
              <p className='text-[10px] text-muted-foreground text-right uppercase tracking-wider font-medium'>
                Ordered on{' '}
                {day(order.createdAt).format('MMM D, YYYY [at] HH:mm')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button fullWidth as={Link} href={ROUTES.HOME}>
        Return to Home
      </Button>
    </Container>
  )
}
