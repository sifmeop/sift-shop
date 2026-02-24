import z from 'zod'

import { emailValidation } from '~/common/schemas/email.schema'
import { englishField } from '~/common/schemas/englishStr.schema'
import { phoneValidation } from '~/common/schemas/phone.schema'

export const accountDetailsSchema = z.object({
  firstName: englishField('First name'),
  lastName: englishField('Last name'),
  phone: phoneValidation,
  email: emailValidation,
  country: englishField('Country', 2, 50),
  city: englishField('City', 2, 50),
  state: englishField('State', 2, 50, { allowNumbers: true, optional: true }),
  address: englishField('Address', 2, 50, { allowNumbers: true }),
  zipCode: z
    .string('Zip code is required')
    .regex(/^\d{5,10}$/, 'Zip code must be 5-10 digits')
})

export type AccountDetailsFormData = z.infer<typeof accountDetailsSchema>
