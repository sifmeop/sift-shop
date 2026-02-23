import z from 'zod'

import { PaymentMethod } from '~/common/lib/graphql/generated/graphql'
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
  country: z
    .string('Country is required')
    .min(2, 'Country is too short')
    .max(50, 'Country is too long'),

  city: z
    .string('City is required')
    .min(2, 'City is too short')
    .max(50, 'City is too long'),

  state: z
    .string('State is required')
    .min(2, 'State is too short')
    .max(50, 'State is too long'),

  zipCode: z
    .string('Zip code is required')
    .regex(/^\d{5,10}$/, 'Zip code must be 5-10 digits'),

  // step #3
  method: z.enum(PaymentMethod, 'Payment method is required')
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
