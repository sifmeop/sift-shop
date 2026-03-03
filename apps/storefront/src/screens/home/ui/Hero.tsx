'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export const Hero = () => {
  return (
    <section className='relative overflow-hidden'>
      <div className='app-container'>
        <div className='relative flex min-h-[420px] items-center py-10 md:min-h-[520px] md:py-14 lg:min-h-[560px] lg:py-20'>
          <div className='relative z-10 max-w-lg pr-2 sm:pr-0'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
              Fresh Arrivals Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='mt-4 max-w-md text-sm sm:text-base md:text-lg'>
              Discover Our Newest Collection Today.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='absolute right-0 top-1/2 hidden -translate-y-1/2 md:block lg:right-12'>
            <div className='relative'>
              <div className='bg-primary-foreground/10 absolute -right-6 -top-6 size-56 rounded-full md:size-64 lg:-right-8 lg:-top-8 lg:size-96' />
              <Image
                src='https://picsum.photos/seed/hero-model/400/500?grayscale'
                alt='Model wearing fresh arrivals collection'
                width={400}
                height={500}
                className='relative z-10 h-auto w-56 rounded-lg object-cover md:w-64 lg:w-80'
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
