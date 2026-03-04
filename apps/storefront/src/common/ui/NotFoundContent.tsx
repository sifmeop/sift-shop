'use client'

import { AlertCircle, Home } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '../constants/routes'

import { Button } from './Button'
import { Container } from './Container'

type NotFoundType = 'category' | 'subcategory' | 'products' | 'product'

interface NotFoundContentProps {
  type: NotFoundType
  title?: string
  description?: string
  showHomeButton?: boolean
}

const typeMessages: Record<
  NotFoundType,
  { title: string; description: string }
> = {
  category: {
    title: 'Category Not Found',
    description:
      'Unfortunately, the requested category does not exist or has been removed'
  },
  subcategory: {
    title: 'Subcategory Not Found',
    description:
      'Unfortunately, the requested subcategory does not exist or has been removed'
  },
  products: {
    title: 'Products Not Found',
    description:
      'Unfortunately, the requested products do not exist or have been removed'
  },
  product: {
    title: 'Product Not Found',
    description:
      'Unfortunately, the requested product does not exist or has been removed'
  }
}

export const NotFoundContent = ({
  type,
  title,
  description,
  showHomeButton = true
}: NotFoundContentProps) => {
  const messages = typeMessages[type]
  const finalTitle = title || messages.title
  const finalDescription = description || messages.description

  return (
    <Container main className='flex min-h-[60dvh] items-center justify-center'>
      <motion.div
        className='text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <motion.div
          className='mb-6 flex justify-center'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}>
          <motion.div
            className='relative'
            animate={{
              rotate: [0, -10, 10, -10, 0]
            }}
            transition={{
              duration: 0.5,
              delay: 0.5
            }}>
            <div className='rounded-full bg-red-100 p-6 dark:bg-red-950'>
              <AlertCircle className='h-16 w-16 text-red-600 dark:text-red-400' />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          className='mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}>
          {finalTitle}
        </motion.h1>

        <motion.p
          className='mb-8 text-gray-600 dark:text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}>
          {finalDescription}
        </motion.p>

        <motion.div
          className='flex flex-col items-center justify-center gap-3 sm:flex-row'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}>
          {showHomeButton && (
            <Button as={Link} href={ROUTES.HOME} className='px-10'>
              <Home className='size-4' />
              Home
            </Button>
          )}
        </motion.div>

        <motion.div
          className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.5 }}>
          <motion.div
            className='absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-400'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className='absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-400'
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </motion.div>
      </motion.div>
    </Container>
  )
}
