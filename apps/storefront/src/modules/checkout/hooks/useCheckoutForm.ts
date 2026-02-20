import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { CheckoutFormData, checkoutSchema } from '../schemas/checkout.schema'

export const useCheckoutForm = () => {
  const form = useForm<CheckoutFormData>({
    defaultValues: {
      // step #1
      firstName: '',
      lastName: '',
      email: '',
      phone: '',

      // step #2
      city: ''
    },
    resolver: zodResolver(checkoutSchema)
  })

  const onSubmit = form.handleSubmit(async (data) => {
    console.debug('data', data)
  })

  return { form, onSubmit }
}
