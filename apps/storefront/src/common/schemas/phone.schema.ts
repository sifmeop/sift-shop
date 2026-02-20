import z from 'zod'

export const UA_PHONE_CODES = [
  '50', // Vodafone
  '66', // Vodafone
  '75', // Vodafone
  '95', // Vodafone
  '99', // Vodafone
  '39', // Kyivstar
  '67', // Kyivstar
  '68', // Kyivstar
  '77', // Kyivstar
  '96', // Kyivstar
  '97', // Kyivstar
  '98', // Kyivstar
  '63', // Lifecell
  '73', // Lifecell
  '93', // Lifecell
  '91', // Others
  '92', // Others
  '94' // Others
]

export const phoneValidation = z
  .string()
  .refine(
    (val) => {
      const digits = val.replace(/\D/g, '')
      const code = digits.slice(0, 2)
      return UA_PHONE_CODES.includes(code)
    },
    { message: 'Invalid phone number' }
  )
  .refine(
    (val) => {
      const digits = val.replace(/\D/g, '')
      return digits.length === 9
    },
    { message: 'Phone number must be 9 digits' }
  )
