import z from 'zod'

import { passwordValidation } from '~/common/schemas/password.schema'

export const signUpSchema = z
  .object({
    fullName: z
      .string('Full name is required')
      .min(2, 'Full name is too short')
      .max(50, 'Full name is too long'),
    email: z.email('Please enter a valid email address'),
    password: passwordValidation,
    confirmPassword: passwordValidation,
    recaptha: z.string('Recaptcha token is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
