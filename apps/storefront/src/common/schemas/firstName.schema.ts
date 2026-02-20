import z from 'zod'

export const firstNameValidation = z
  .string('Password is required')
  .min(2, 'First name must be at least 2 characters')
  .max(32, 'First name must be at most 32 characters')
