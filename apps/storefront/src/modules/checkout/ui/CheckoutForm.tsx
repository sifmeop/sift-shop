'use client'

import { FormProvider } from 'react-hook-form'

import { Container } from '~/common/ui/Container'
import { Separator } from '~/common/ui/Separator'

import { useCheckoutForm } from '../hooks/useCheckoutForm'

import { CheckoutFlow } from './CheckoutFlow'
import { OrderSummary } from './OrderSummary'

export const CheckoutForm = () => {
  const { form, onSubmit, currentStep, setCurrentStep } = useCheckoutForm()

  return (
    <FormProvider {...form}>
      <Container main bgColor='white' className='py-12'>
        <form onSubmit={onSubmit} className='grid grid-cols-[1fr_0.7fr]'>
          <CheckoutFlow
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <div className='sticky top-4 flex h-fit overflow-hidden'>
            <Separator orientation='vertical' className='ml-16 mr-10' />
            <OrderSummary />
          </div>
        </form>
      </Container>
    </FormProvider>
  )
}
