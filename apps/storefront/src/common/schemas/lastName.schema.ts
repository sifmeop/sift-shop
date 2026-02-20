import z from 'zod'

export const lastNameValidation = z
  .string('Password is required')
  .min(2, 'Last name must be at least 2 characters')
  .max(32, 'Last name must be at most 32 characters')
