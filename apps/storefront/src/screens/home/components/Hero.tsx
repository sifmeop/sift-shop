'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'

export const Hero = () => {
  return (
    <section className='relative overflow-hidden'>
      <div className='app-container'>
        <div className='relative flex min-h-[500px] items-center py-12 md:min-h-[560px] lg:py-20'>
          <div className='relative z-10 max-w-lg'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              Fresh Arrivals Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='mt-4 text-base md:text-lg'>
              Discover Our Newest Collection Today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <Button
                asChild
                className='mt-8 bg-foreground hover:bg-foreground/90'>
                <Link href={ROUTES.CATEGORY}>
                  View Collection
                  <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='absolute right-0 top-1/2 hidden -translate-y-1/2 md:block lg:right-12'>
            <div className='relative'>
              <div className='bg-primary-foreground/10 absolute -right-8 -top-8 size-72 rounded-full lg:size-96' />
              <Image
                src='https://picsum.photos/seed/hero-model/400/500?grayscale'
                alt='Model wearing fresh arrivals collection'
                width={400}
                height={500}
                className='relative z-10 h-auto w-64 rounded-lg object-cover lg:w-80'
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
