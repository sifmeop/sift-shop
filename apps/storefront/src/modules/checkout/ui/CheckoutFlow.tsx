import { CenterLoader } from '~/common/ui/CenterLoader'
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

interface CheckoutFlowProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

export const CheckoutFlow = ({
  currentStep,
  setCurrentStep
}: CheckoutFlowProps) => {
  const Component = [ContactStep, DeliveryStep, PaymentStep, CenterLoader][
    currentStep
  ]

  return (
    <div className='flex flex-col gap-10'>
      <Stepper steps={steps} currentStep={currentStep} />
      <Component onNext={() => setCurrentStep((prev) => prev + 1)} />
    </div>
  )
}
