import z from 'zod'

import { emailValidation } from '~/common/schemas/email.schema'
import { firstNameValidation } from '~/common/schemas/firstName.schema'
import { lastNameValidation } from '~/common/schemas/lastName.schema'
import { phoneValidation } from '~/common/schemas/phone.schema'

export const checkoutSchema = z.object({
  // step #1
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  phone: phoneValidation,
  email: emailValidation,

  // step #2
  city: z
    .string('City is required')
    .min(2, 'City is too short')
    .max(50, 'City is too long')

  // step #3
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
