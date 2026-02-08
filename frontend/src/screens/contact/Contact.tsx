'use client'

import { GithubIcon, Mail, MessageSquare, Send } from 'lucide-react'
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

export const ContactPage = () => {
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
            <MessageSquare className='w-3.5 h-3.5' />
            We&apos;d love to hear from you
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className='text-4xl md:text-6xl lg:text-7xl font-light tracking-tight'>
            Get in{' '}
            <span className='font-semibold bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent'>
              Touch
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
            Have questions, suggestions, or just want to say hello? We&apos;re
            here to help.
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
          className='absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10'
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
            How to Reach Us
          </motion.h2>

          <motion.div
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='grid md:grid-cols-2 gap-8'>
            <ContactCard
              icon={<Mail className='w-5 h-5' />}
              title='Email Us'
              description='For general inquiries, support, or partnership opportunities.'
              action='sifmeop@gmail.com'
              href='mailto:hello@sifmeop@gmail.com'
            />
            <ContactCard
              icon={<GithubIcon className='w-5 h-5' />}
              title='GitHub'
              description='Check out our open-source projects and contribute to the community.'
              action='View Repository'
              href='https://github.com/sifmeop/sift-shop'
              external
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
              Common Questions
            </motion.h2>

            <motion.div variants={fadeInUp} className='space-y-6 text-left'>
              <QuestionItem
                question='Do you ship internationally?'
                answer='Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location.'
              />
              <QuestionItem
                question='What is your return policy?'
                answer='We offer a 30-day return policy on all products. Items must be unused and in original packaging.'
              />
              <QuestionItem
                question='How do you select products?'
                answer='Each product goes through rigorous testing and evaluation. We only list items that meet our quality standards.'
              />
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
          className='mx-auto max-w-2xl text-center space-y-8 p-8 md:p-12 rounded-2xl border bg-gradient-to-b from-muted/50 to-muted/20'>
          <h2 className='text-2xl md:text-3xl font-light'>
            Ready to start shopping?
          </h2>
          <p className='text-muted-foreground'>
            Explore our curated collection of quality products
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
                <Send className='w-4 h-4' />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  href: string
  external?: boolean
}

const ContactCard = ({
  icon,
  title,
  description,
  action,
  href,
  external = false
}: ContactCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className='group space-y-4 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:bg-background transition-colors'>
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

      {external ? (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 group/link'>
          {action}
          <motion.span
            className='inline-block'
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            →
          </motion.span>
        </a>
      ) : (
        <a
          href={href}
          className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 group/link'>
          {action}
          <motion.span
            className='inline-block'
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            →
          </motion.span>
        </a>
      )}
    </motion.div>
  )
}

interface QuestionItemProps {
  question: string
  answer: string
}

const QuestionItem = ({ question, answer }: QuestionItemProps) => {
  return (
    <div className='space-y-2 p-4 rounded-lg border bg-background/50 backdrop-blur-sm'>
      <h3 className='font-medium text-base'>{question}</h3>
      <p className='text-sm text-muted-foreground leading-relaxed'>{answer}</p>
    </div>
  )
}
