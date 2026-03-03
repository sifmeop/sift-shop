'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export const FashionBanner = () => {
  return (
    <section className='bg-white overflow-hidden'>
      <div className='app-container'>
        <div className='flex flex-col items-center gap-8 py-12 md:flex-row md:justify-between md:gap-10 md:py-16 lg:py-20'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='max-w-md text-center md:text-left'>
            <h2 className='text-2xl font-bold sm:text-3xl lg:text-4xl'>
              Browse Our Fashion Paradise!
            </h2>
            <p className='mt-3 text-sm md:mt-4 md:text-base'>
              Step into a world of style and explore our diverse collection of
              clothing categories.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative'>
            <Image
              src='https://picsum.photos/seed/fashion-hanger/400/350?grayscale'
              alt='Fashion collection on hanger'
              width={400}
              height={350}
              className='h-auto w-full max-w-72 rounded-lg object-cover sm:max-w-80 lg:max-w-96'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
