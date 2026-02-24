'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import {
  OrderEntity,
  OrderStatus
} from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Show } from '~/common/ui/show'
import { formatPrice } from '~/common/utils/formatPrice'

const MotionButton = motion.create(Button)

interface ParticleProps {
  x: number
  delay: number
}

const COLORS = [
  '#f9a8d4',
  '#86efac',
  '#93c5fd',
  '#fde68a',
  '#c4b5fd',
  '#fb923c'
]

const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  delay: Math.random() * 1.4
}))

const Particle = ({ x, delay }: ParticleProps) => {
  // eslint-disable-next-line react-hooks/purity
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  // eslint-disable-next-line react-hooks/purity
  const size = 6 + Math.random() * 8
  // eslint-disable-next-line react-hooks/purity
  const rotation = Math.random() * 360
  // eslint-disable-next-line react-hooks/purity
  const isCircle = Math.random() > 0.5

  return (
    <motion.div
      className={`absolute top-0 pointer-events-none ${isCircle ? 'rounded-full' : 'rounded-sm'}`}
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        backgroundColor: color
      }}
      initial={{ y: -20, opacity: 0, scale: 0, rotate: rotation }}
      animate={{
        y: '110vh',
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.4],
        rotate: rotation + 720,
        // eslint-disable-next-line react-hooks/purity
        x: (Math.random() - 0.5) * 200
      }}
      transition={{
        // eslint-disable-next-line react-hooks/purity
        duration: 2.5 + Math.random() * 2,
        delay,
        ease: 'easeIn'
      }}
    />
  )
}

const Confetti = () => (
  <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
    <AnimatePresence>
      {PARTICLES.map((p) => (
        <Particle key={p.id} x={p.x} delay={p.delay} />
      ))}
    </AnimatePresence>
  </div>
)

const CheckCircle = () => (
  <motion.div
    className='relative flex items-center justify-center'
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 }}>
    <motion.div
      className='absolute rounded-full size-34 bg-[radial-gradient(circle,rgba(74,222,128,0.25)_0%,transparent_70%)]'
      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
      transition={{
        duration: 2.4,
        delay: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    <motion.div
      className='w-28 h-28 rounded-full flex items-center justify-center relative z-10 bg-linear-to-br from-green-400 to-green-600 shadow-[0_0_48px_rgba(74,222,128,0.35),0_0_100px_rgba(74,222,128,0.1)]'
      initial={{ rotate: -90 }}
      animate={{ rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}>
      <svg width='52' height='52' viewBox='0 0 52 52' fill='none'>
        <motion.path
          d='M14 26L22 34L38 18'
          stroke='white'
          strokeWidth='4.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  </motion.div>
)

const DetailRow = ({
  label,
  value,
  delay
}: {
  label: string
  value: string
  delay: number
}) => (
  <motion.div
    className='flex items-center justify-between py-3 border-b border-black/6 last:border-0'
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4, ease: 'easeOut' }}>
    <span className='whitespace-nowrap text-sm font-light tracking-wide text-black/40'>
      {label}
    </span>
    <span className='text-sm font-medium tabular-nums text-black/75 text-end'>
      {value}
    </span>
  </motion.div>
)

const PendingCircle = () => (
  <motion.div
    className='relative flex items-center justify-center'
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 }}>
    <motion.div
      className='absolute rounded-full w-[136px] h-[136px] bg-[radial-gradient(circle,rgba(234,179,8,0.25)_0%,transparent_70%)]'
      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
      transition={{
        duration: 2.4,
        delay: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    <motion.div
      className='w-28 h-28 rounded-full flex items-center justify-center relative z-10 bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-[0_0_48px_rgba(234,179,8,0.35),0_0_100px_rgba(234,179,8,0.1)]'
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
      <svg width='52' height='52' viewBox='0 0 52 52' fill='none'>
        <circle
          cx='26'
          cy='26'
          r='18'
          stroke='white'
          strokeWidth='4'
          strokeLinecap='round'
          strokeDasharray='28 84'
        />
      </svg>
    </motion.div>
  </motion.div>
)

const CashCircle = () => (
  <motion.div
    className='relative flex items-center justify-center'
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 }}>
    <motion.div
      className='absolute rounded-full w-[136px] h-[136px] bg-[radial-gradient(circle,rgba(59,130,246,0.25)_0%,transparent_70%)]'
      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
      transition={{
        duration: 2.4,
        delay: 0.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    <motion.div
      className='w-28 h-28 rounded-full flex items-center justify-center relative z-10 bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_48px_rgba(59,130,246,0.35),0_0_100px_rgba(59,130,246,0.1)]'
      initial={{ rotate: -90 }}
      animate={{ rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}>
      <svg width='52' height='52' viewBox='0 0 52 52' fill='none'>
        <motion.rect
          x='8'
          y='16'
          width='36'
          height='22'
          rx='3'
          stroke='white'
          strokeWidth='3.5'
          fill='none'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
        />
        <motion.path
          d='M8 23h36'
          stroke='white'
          strokeWidth='3.5'
          strokeLinecap='round'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.1, ease: 'easeOut' }}
        />
        <motion.path
          d='M14 31h6'
          stroke='white'
          strokeWidth='3.5'
          strokeLinecap='round'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.25, delay: 1.3, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  </motion.div>
)

const STATUS_CONFIG = {
  [OrderStatus.Paid]: {
    glow: 'bg-[radial-gradient(circle,#bbf7d0_0%,transparent_65%)]',
    pill: 'bg-green-600/8 border-green-600/20',
    amount: 'text-green-700',
    button: 'green' as const,
    title: 'Order confirmed',
    subtitle: 'Thank you for your purchase',
    footer: 'A confirmation email has been sent to your inbox',
    circle: <CheckCircle />,
    showConfetti: true
  },
  [OrderStatus.Pending]: {
    glow: 'bg-[radial-gradient(circle,#fef08a_0%,transparent_65%)]',
    pill: 'bg-yellow-500/8 border-yellow-500/20',
    amount: 'text-yellow-600',
    button: 'yellow' as const,
    title: 'Confirming payment',
    subtitle: 'Please wait a moment...',
    footer: 'This may take a few seconds',
    circle: <PendingCircle />,
    showConfetti: false
  },
  [OrderStatus.AwaitingPayment]: {
    glow: 'bg-[radial-gradient(circle,#bfdbfe_0%,transparent_65%)]',
    pill: 'bg-blue-500/8 border-blue-500/20',
    amount: 'text-blue-600',
    button: 'blue' as const,
    title: 'Order placed',
    subtitle: 'Pay upon delivery',
    footer: 'Please have the exact amount ready upon delivery',
    circle: <CashCircle />,
    showConfetti: false
  }
}

const getStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.Paid]: 'Paid',
    [OrderStatus.Pending]: 'Pending',
    [OrderStatus.AwaitingPayment]: 'Awaiting payment',
    [OrderStatus.Cancelled]: 'Cancelled'
  }
  return labels[status] ?? status
}

interface CheckoutSuccessPageProps {
  order: OrderEntity
}

export const CheckoutSuccessPage = ({ order }: CheckoutSuccessPageProps) => {
  const [confettiActive, setConfettiActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (order.status !== OrderStatus.Pending) return

    const interval = setInterval(router.refresh, 5000)

    return () => clearInterval(interval)
  }, [order.status])

  useEffect(() => {
    const t = setTimeout(() => setConfettiActive(true), 150)
    return () => clearTimeout(t)
  }, [])

  const config =
    STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ??
    STATUS_CONFIG[OrderStatus.Pending]

  return (
    <div className='min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#f4f6f0] py-6'>
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div
          className={`absolute rounded-full opacity-40 size-200 -top-1/4 left-1/2 -translate-x-1/2 blur-[80px] ${config.glow}`}
        />
        <div className='absolute rounded-full opacity-20 size-125 -bottom-[10%] right-[5%] bg-[radial-gradient(circle,#bfdbfe_0%,transparent_65%)] blur-[100px]' />
        <div className='absolute rounded-full opacity-20 size-100 bottom-[10%] -left-[5%] bg-[radial-gradient(circle,#fde68a_0%,transparent_65%)] blur-[90px]' />
        <div className='absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-size-[64px_64px]' />
      </div>

      <Show when={confettiActive && config.showConfetti}>
        <Confetti />
      </Show>

      <motion.div
        className='relative z-10 w-full max-w-105'
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className='px-8 rounded-[28px] overflow-hidden bg-white/75 border border-white/90 backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_48px_96px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)]'>
          <div className='pt-14 pb-8 flex flex-col items-center text-center'>
            {config.circle}

            <motion.div
              className='mt-9'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}>
              <h1 className='text-[#0f1a0f] text-4xl font-bold leading-none tracking-tight'>
                {config.title}
              </h1>
              <p className='text-xs font-medium tracking-[0.2em] uppercase mt-3 text-black/35'>
                {config.subtitle}
              </p>
            </motion.div>

            <motion.div
              className={`mt-7 px-7 py-3 rounded-full border ${config.pill}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.15,
                type: 'spring',
                stiffness: 280,
                damping: 20
              }}>
              <span
                className={`text-2xl font-semibold tabular-nums ${config.amount}`}>
                {formatPrice(order.subtotalAmount)}
              </span>
            </motion.div>
          </div>

          <div>
            <motion.p
              className='text-[10px] uppercase tracking-[0.22em] font-semibold mb-1 text-black/25'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}>
              Order details
            </motion.p>
            <motion.div
              className='h-px bg-black/6 origin-left'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.25, duration: 0.5 }}
            />
            <DetailRow label='Order ID' value={order.id} delay={1.38} />
            <DetailRow
              label='Status'
              value={getStatusLabel(order.status)}
              delay={1.38}
            />
            <DetailRow
              label='Payment'
              value={order.method === 'CARD' ? 'Card' : 'Cash'}
              delay={1.54}
            />
            <DetailRow
              label='Date'
              value={new Date(order.createdAt).toDateString()}
              delay={1.46}
            />
          </div>

          <motion.div
            className='h-px bg-black/6 origin-left'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          />

          <div className='pt-6 pb-10 flex flex-col gap-3'>
            <MotionButton
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.78, duration: 0.4 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              as={Link}
              href={ROUTES.ORDERS}
              variant='outline'
              color={config.button}>
              View my orders
            </MotionButton>

            <MotionButton
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.88, duration: 0.4 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              as={Link}
              href={ROUTES.HOME}
              variant='outline'>
              Continue shopping
            </MotionButton>
          </div>
        </div>

        <motion.p
          className='text-center text-xs font-light mt-5 text-black/[0.28]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}>
          {config.footer}
        </motion.p>
      </motion.div>
    </div>
  )
}
