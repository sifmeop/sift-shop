import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { PaymentMethod } from '~/common/lib/graphql/generated/graphql'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { CheckoutFormData, checkoutSchema } from '../schemas/checkout.schema'

import { useCreateOrder } from './useCreateOrder'

export const useCheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const [mutate] = useCreateOrder()

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      // step #1
      firstName: '',
      lastName: '',
      email: '',
      phone: '',

      // step #2
      city: '',
      country: '',
      state: '',
      zipCode: '',

      method: PaymentMethod.Card
    },
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange'
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setCurrentStep(3)

    try {
      const { data } = await mutate({
        variables: {
          input: values
        }
      })

      if (data?.create.url) {
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = data.create.url
      }
    } catch (error) {
      setCurrentStep(2)
      handleGraphQLError(error)
    }
  })

  return { form, onSubmit, currentStep, setCurrentStep }
}
