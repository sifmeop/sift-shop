import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { PaymentMethod } from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { CheckoutFormData, checkoutSchema } from '../schemas/checkout.schema'

import { useCreateOrder } from './useCreateOrder'

export const useCheckoutForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const accountDetails = useUserStore((state) => state.user?.accountDetails)

  const [mutate] = useCreateOrder()

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      // step #1
      firstName: accountDetails?.firstName ?? '',
      lastName: accountDetails?.lastName ?? '',
      email: accountDetails?.email ?? '',
      phone: accountDetails?.phone ?? '',

      // step #2
      city: accountDetails?.city ?? '',
      country: accountDetails?.country ?? '',
      state: accountDetails?.state ?? '',
      address: accountDetails?.address ?? '',
      zipCode: accountDetails?.zipCode ?? '',

      method: PaymentMethod.Card
    },
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    if (accountDetails) {
      for (const key in accountDetails) {
        const typedKey = key as keyof Omit<CheckoutFormData, 'method'>
        // @ts-expect-error fix
        form.setValue(typedKey, accountDetails[key])
      }
    }
  }, [accountDetails])

  const onSubmit = form.handleSubmit(async (values) => {
    setCurrentStep(3)

    try {
      const { data } = await mutate({
        variables: { input: values }
      })

      if (data?.create.url) {
        // window.location.href = data.create.url
        router.push(data.create.url)
      }
    } catch (error) {
      setCurrentStep(2)
      handleGraphQLError(error)
    }
  })

  return { form, onSubmit, currentStep, setCurrentStep }
}
