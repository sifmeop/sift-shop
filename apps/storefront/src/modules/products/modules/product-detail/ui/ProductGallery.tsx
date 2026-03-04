'use client'

import { useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

import { ProductDetailEntity } from '~/common/lib/graphql/generated/graphql'
import { Container } from '~/common/ui/Container'
import { Show } from '~/common/ui/Show'
import { cn } from '~/common/utils/cn'
import { getImageUrl } from '~/common/utils/getImageUrl'

type ProductGalleryProps = ProductDetailEntity

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const goPrev = () => {
    if (activeIndex > 0) {
      goTo(activeIndex - 1)
    } else {
      goTo(images.length - 1)
    }
  }

  const goNext = () => {
    if (activeIndex < images.length - 1) {
      goTo(activeIndex + 1)
    } else {
      goTo(0)
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 })
  }

  return (
    <div className='flex flex-col gap-2 overflow-hidden md:gap-3'>
      <Container
        bgColor='white'
        className='rounded-lg overflow-hidden'
        innerClassName='aspect-square relative'>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='absolute inset-0'>
            <Image
              draggable={false}
              src={getImageUrl(images[activeIndex])}
              alt={`${name} ${activeIndex + 1}`}
              fill
              className='object-contain p-4 select-none sm:p-6 md:p-8'
              priority
            />
          </motion.div>
        </AnimatePresence>

        <Show when={images.length > 1}>
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='absolute left-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 sm:left-3 sm:size-9'>
            <ChevronLeft className='size-4' />
          </motion.button>
          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='absolute right-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 sm:right-3 sm:size-9'>
            <ChevronRight className='size-4' />
          </motion.button>
        </Show>

        <Show when={images.length > 1}>
          <div className='absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/40 text-white text-xs font-medium backdrop-blur-sm'>
            {activeIndex + 1} / {images.length}
          </div>
        </Show>
      </Container>

      <Show when={images.length > 1}>
        <Container
          bgColor='white'
          className='rounded-lg overflow-hidden'
          innerClassName='px-0!'>
          <motion.div
            dragDirectionLock
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            className='scrollbar-none flex gap-2 overflow-x-auto p-2'>
            {images.map((image, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'size-14 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all sm:size-16',
                  activeIndex === i
                    ? 'border-primary'
                    : 'border-border opacity-60 hover:opacity-100'
                )}>
                <div className='relative size-full'>
                  <Image
                    draggable={false}
                    src={getImageUrl(image)}
                    alt={`${name} ${i + 1}`}
                    fill
                    className='object-contain p-1.5 select-none'
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </Container>
      </Show>
    </div>
  )
}
