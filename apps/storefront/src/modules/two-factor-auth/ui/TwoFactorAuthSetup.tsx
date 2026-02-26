'use client'

import { useState } from 'react'

import { useUserStore } from '~/common/stores/user'
import { Step, Stepper } from '~/common/ui/Stepper'

import { DisableStep } from './steps/DisableStep'
import { DoneStep } from './steps/DoneStep'
import { SetupStep } from './steps/SetupStep'
import { VerifyStep } from './steps/VerifyStep'

const steps: Step[] = [
  {
    id: 'setup',
    label: 'Setup'
  },
  {
    id: 'verify',
    label: 'Verify'
  },
  {
    id: 'done',
    label: 'Done'
  }
]

export const TwoFactorAuthSetup = () => {
  const isTwoFactorEnabled = useUserStore(
    (state) => state.user?.isTwoFactorEnabled
  )

  const [currentStep, setCurrentStep] = useState(isTwoFactorEnabled ? 3 : 0)

  const Content = [SetupStep, VerifyStep, DoneStep, DisableStep][currentStep]

  return (
    <div>
      <Stepper steps={steps} currentStep={currentStep} className='mb-6' />
      <div className='max-w-xl mx-auto'>
        <Content
          onNext={(step) => {
            setCurrentStep((prev) => {
              if (typeof step === 'number') return step
              return prev + 1
            })
          }}
        />
      </div>
    </div>
  )
}
