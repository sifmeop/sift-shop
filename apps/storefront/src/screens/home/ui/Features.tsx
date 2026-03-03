'use client'

import { Package, ShieldCheck, ThumbsUp } from 'lucide-react'
import { motion } from 'motion/react'

const features = [
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
    <section className='bg-white py-12 md:py-16 lg:py-20'>
      <div className='app-container'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-12'>
          {features.map((feature) => (
            <motion.article
              key={feature.id}
              variants={itemVariants}
              className='text-center'>
              <div className='bg-muted mx-auto mb-4 flex size-11 items-center justify-center rounded-lg sm:size-12'>
                {feature.icon}
              </div>
              <h3 className='text-foreground mb-2 text-base font-semibold sm:text-lg'>
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
