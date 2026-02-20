import z from 'zod'

export const emailValidation = z.email('Please enter a valid email address')
