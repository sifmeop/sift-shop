'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import {
  OrderEntity,
  OrderStatus
} from '~/common/lib/graphql/generated/graphql'
import { Show } from '~/common/ui/show'
import { formatPrice } from '~/common/utils/formatPrice'

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
    <span className='text-sm font-light tracking-wide text-black/40'>
      {label}
    </span>
    <span className='text-sm font-medium tabular-nums text-black/75 text-end'>
      {value}
    </span>
  </motion.div>
)

interface CheckoutSuccessPageProps {
  order: OrderEntity
}

export const CheckoutSuccessPage = ({ order }: CheckoutSuccessPageProps) => {
  const [confettiActive, setConfettiActive] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setConfettiActive(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#f4f6f0] py-6'>
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute rounded-full opacity-40 size-200 -top-1/4 left-1/2 -translate-x-1/2 bg-[radial-gradient(circle,#bbf7d0_0%,transparent_65%)] blur-[80px]' />
        <div className='absolute rounded-full opacity-20 size-125 -bottom-[10%] right-[5%] bg-[radial-gradient(circle,#bfdbfe_0%,transparent_65%)] blur-[100px]' />
        <div className='absolute rounded-full opacity-20 size-100 bottom-[10%] -left-[5%] bg-[radial-gradient(circle,#fde68a_0%,transparent_65%)] blur-[90px]' />
        <div className='absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-size-[64px_64px]' />
      </div>

      <Show when={confettiActive}>
        <Confetti />
      </Show>

      <motion.div
        className='relative z-10 w-full max-w-105'
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className='rounded-[28px] overflow-hidden bg-white/75 border border-white/90 backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_48px_96px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)]'>
          <div className='px-10 pt-14 pb-8 flex flex-col items-center text-center'>
            <CheckCircle />

            <motion.div
              className='mt-9'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}>
              <h1 className='text-[#0f1a0f] text-4xl font-bold leading-none tracking-tight'>
                Order confirmed
              </h1>
              <p className='text-xs font-medium tracking-[0.2em] uppercase mt-3 text-black/35'>
                Thank you for your purchase
              </p>
            </motion.div>

            <motion.div
              className='mt-7 px-7 py-3 rounded-full bg-green-600/8 border border-green-600/20'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.15,
                type: 'spring',
                stiffness: 280,
                damping: 20
              }}>
              <span className='text-2xl font-semibold tabular-nums text-green-700'>
                {formatPrice(
                  order.items.reduce((acc, item) => acc + item.price, 0)
                )}
              </span>
            </motion.div>
          </div>

          <motion.div
            className='mx-8 h-px bg-black/6 origin-left'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.25, duration: 0.5 }}
          />

          <div className='px-8 py-5'>
            <motion.p
              className='text-[10px] uppercase tracking-[0.22em] font-semibold mb-1 text-black/25'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}>
              Order details
            </motion.p>
            <DetailRow label='Order ID' value={order.id} delay={1.38} />
            <DetailRow
              label='Status'
              value={order.status === OrderStatus.Paid ? 'Paid' : 'Pending'}
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
            className='mx-8 h-px bg-black/6 origin-left'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          />

          <div className='px-8 pt-6 pb-10 flex flex-col gap-3'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.78, duration: 0.4 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}>
              <Link
                href={ROUTES.ORDERS}
                className='flex items-center justify-center w-full py-3.75 rounded-2xl text-sm font-semibold tracking-[0.01em] bg-linear-to-br from-green-400 to-green-600 shadow-[0_4px_24px_rgba(74,222,128,0.35)] transition-shadow duration-200'>
                View my orders
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.88, duration: 0.4 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}>
              <Link
                href={ROUTES.HOME}
                className='flex items-center justify-center w-full py-3.75 rounded-2xl text-sm font-medium tracking-[0.01em] bg-black/4 text-black/45 border border-black/8 transition-all duration-200'>
                Continue shopping
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.p
          className='text-center text-xs font-light mt-5 text-black/[0.28]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}>
          A confirmation email has been sent to your inbox
        </motion.p>
      </motion.div>
    </div>
  )
}
