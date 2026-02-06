'use client'

import { useState } from 'react'

import { motion } from 'motion/react'
import { toast } from 'sonner'

import { Button } from '~/common/ui/button'
import { Container } from '~/common/ui/container'
import { Input } from '~/common/ui/input'

export const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Thank you for subscribing!')
    setEmail('')
    setIsLoading(false)
  }

  return (
    <Container bgColor='white' className='py-15'>
      <div className='app-container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center gap-8 md:flex-row md:justify-between'>
          <div className='text-center md:text-left'>
            <h2 className='text-xl font-bold md:text-2xl'>
              Join Our Newsletter
            </h2>
            <p className='mt-2 text-sm'>
              We love to surprise our subscribers with occasional gifts.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='flex w-full max-w-md flex-col gap-3 sm:flex-row'>
            <div className='flex-1'>
              <label htmlFor='newsletter-email' className='sr-only'>
                Email address
              </label>
              <Input
                id='newsletter-email'
                type='email'
                placeholder='Your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type='submit' isLoading={isLoading}>
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </Container>
  )
}
