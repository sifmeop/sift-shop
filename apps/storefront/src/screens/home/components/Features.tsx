'use client'

import { Package, ShieldCheck, ThumbsUp } from 'lucide-react'
import { motion } from 'motion/react'

import type { Feature } from '../types'

const features: Feature[] = [
  {
    id: 'free-shipping',
    icon: <Package className='size-6' />,
    title: 'Free Shipping',
    description:
      "Upgrade your style today and get FREE shipping on all orders! Don't miss out."
  },
  {
    id: 'satisfaction',
    icon: <ThumbsUp className='size-6' />,
    title: 'Satisfaction Guarantee',
    description:
      'Shop confidently with our Satisfaction Guarantee: Love it or get a refund.'
  },
  {
    id: 'secure-payment',
    icon: <ShieldCheck className='size-6' />,
    title: 'Secure Payment',
    description:
      'Your security is our priority. Your payments are secure with us.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export const Features = () => {
  return (
    <section className='bg-white py-16 md:py-20'>
      <div className='app-container'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {features.map((feature) => (
            <motion.article
              key={feature.id}
              variants={itemVariants}
              className='text-center'>
              <div className='bg-muted mx-auto mb-4 flex size-12 items-center justify-center rounded-lg'>
                {feature.icon}
              </div>
              <h3 className='text-foreground mb-2 text-lg font-semibold'>
                {feature.title}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
