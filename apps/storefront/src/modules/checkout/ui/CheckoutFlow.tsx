import { useState } from 'react'

import { Step, Stepper } from '~/common/ui/Stepper'

import { ContactStep } from './steps/ContactStep'
import { DeliveryStep } from './steps/DeliveryStep'
import { PaymentStep } from './steps/PaymentStep'

const steps: Step[] = [
  {
    id: 'contact',
    label: 'Contact'
  },
  {
    id: 'delivery',
    label: 'Delivery'
  },
  {
    id: 'payment',
    label: 'Payment'
  }
]

export const CheckoutFlow = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const Component = [ContactStep, DeliveryStep, PaymentStep][currentStep]

  return (
    <div className='flex flex-col gap-10'>
      <Stepper steps={steps} currentStep={currentStep} />
      <Component onNext={() => setCurrentStep(currentStep + 1)} />
    </div>
  )
}
