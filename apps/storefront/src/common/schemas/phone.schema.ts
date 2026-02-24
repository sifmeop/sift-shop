import z from 'zod'

export const phoneValidation = z
  .string('Phone number is required')
  .regex(/^\+?[0-9\s\-()]{7,15}$/, { message: 'Invalid phone number' })
