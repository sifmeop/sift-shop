import z from 'zod'

import { PaymentMethod } from '~/common/lib/graphql/generated/graphql'
import { emailValidation } from '~/common/schemas/email.schema'
import { englishField } from '~/common/schemas/englishStr.schema'
import { phoneValidation } from '~/common/schemas/phone.schema'

export const checkoutSchema = z.object({
  // step #1
  firstName: englishField('First name'),
  lastName: englishField('Last name'),
  phone: phoneValidation,
  email: emailValidation,

  // step #2
  country: englishField('Country', 2, 50),
  city: englishField('City', 2, 50),
  state: englishField('State', 2, 50, { allowNumbers: true, optional: true }),
  address: englishField('Address', 2, 50, { allowNumbers: true }),
  zipCode: z
    .string('Zip code is required')
    .regex(/^\d{5,10}$/, 'Zip code must be 5-10 digits'),

  // step #3
  method: z.enum(PaymentMethod, 'Payment method is required')
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
