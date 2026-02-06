'use client'

import { ArrowRight, Package, Shield, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

export const AboutPage = () => {
  return (
    <div className='min-h-screen bg-linear-to-b from-background via-background to-muted/20'>
      <section className='app-container relative py-12'>
        <motion.div
          className='mx-auto max-w-3xl text-center space-y-8'
          initial='initial'
          animate='animate'
          variants={staggerContainer}>
          <motion.div
            variants={fadeInUp}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm text-sm text-muted-foreground'>
            <Sparkles className='w-3.5 h-3.5' />
            Curating quality since 2024
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className='text-4xl md:text-6xl lg:text-7xl font-light tracking-tight'>
            About{' '}
            <span className='font-semibold bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent'>
              Sift-Shop
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
            We believe shopping should be simple, curated, and delightful. Every
            product is handpicked to meet our standards of quality and design.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='absolute top-20 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10'
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className='absolute bottom-20 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10'
        />
      </section>

      <section className='app-container py-12'>
        <div className='mx-auto max-w-5xl'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className='text-sm uppercase tracking-widest text-muted-foreground mb-12 text-center'>
            Our Philosophy
          </motion.h2>

          <motion.div
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='grid md:grid-cols-3 gap-8 md:gap-12'>
            <ValueCard
              icon={<Package className='w-5 h-5' />}
              title='Curated Selection'
              description='Less is more. We carefully select each product, ensuring every item meets our quality standards.'
            />
            <ValueCard
              icon={<Shield className='w-5 h-5' />}
              title='Trustworthy'
              description='Your trust matters. We partner only with verified sellers and guarantee authentic products.'
            />
            <ValueCard
              icon={<Sparkles className='w-5 h-5' />}
              title='Delightful Experience'
              description='Shopping should spark joy. From discovery to delivery, every touchpoint is thoughtfully designed.'
            />
          </motion.div>
        </div>
      </section>

      <section className='app-container py-12'>
        <motion.div
          initial='initial'
          whileInView='animate'
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className='mx-auto max-w-3xl space-y-8'>
          <motion.div
            variants={fadeInUp}
            className='h-px w-16 bg-border mx-auto'
          />

          <div className='space-y-6 text-center'>
            <motion.h2
              variants={fadeInUp}
              className='text-3xl md:text-4xl font-light'>
              The Story
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className='prose prose-neutral dark:prose-invert mx-auto text-muted-foreground space-y-4 text-left md:text-center'>
              <p>
                Sift-Shop was born from a simple frustration: online shopping
                had become overwhelming. Endless scrolling through thousands of
                similar products, uncertain reviews, and decision fatigue.
              </p>
              <p>
                We imagined something different. A shop that does the heavy
                lifting for you. Where every product is vetted, every category
                is thoughtfully curated, and finding what you need feels
                effortless.
              </p>
              <p>
                Today, we&apos;re building that vision — one carefully selected
                product at a time.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className='h-px w-16 bg-border mx-auto'
          />
        </motion.div>
      </section>

      <section className='app-container py-12'>
        <motion.div
          initial='initial'
          whileInView='animate'
          viewport={{ once: true, margin: '-100px' }}
          variants={scaleIn}
          className='mx-auto max-w-2xl text-center space-y-8 p-8 md:p-12 rounded-2xl border bg-linear-to-b from-muted/50 to-muted/20'>
          <h2 className='text-2xl md:text-3xl font-light'>Ready to explore?</h2>
          <p className='text-muted-foreground'>
            Discover products that are worth your time
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Link
              href={ROUTES.CATEGORY}
              className='inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium group'>
              Browse Products
              <motion.span
                className='inline-block'
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}>
                <ArrowRight className='w-4 h-4' />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

// Value Card Component with Motion
const ValueCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className='group space-y-4'>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className='w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors'>
        {icon}
      </motion.div>

      <div className='space-y-2'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-sm text-muted-foreground leading-relaxed'>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
