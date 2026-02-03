import z from 'zod'

import { passwordValidation } from '~/common/schemas/password.schema'

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
