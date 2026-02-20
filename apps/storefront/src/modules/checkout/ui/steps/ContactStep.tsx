import { useFormContext } from 'react-hook-form'

import { Button } from '~/common/ui/button'
import { FieldGroup } from '~/common/ui/field'
import {
  EmailInput,
  FirstNameInput,
  LastNameInput,
  PhoneInput
} from '~/common/ui/input'

import { CheckoutFormData } from '../../schemas/checkout.schema'

interface ContactStepProps {
  onNext: () => void
}

export const ContactStep = ({ onNext }: ContactStepProps) => {
  const { trigger } = useFormContext<CheckoutFormData>()

  const handleNext = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email', 'phone'], {
      shouldFocus: true
    })

    if (isValid) {
      onNext()
    }
  }

  return (
    <div className='flex flex-col justify-between flex-1 gap-4'>
      <FieldGroup className='grid grid-cols-2 gap-4'>
        <FirstNameInput />
        <LastNameInput />
        <EmailInput />
        <PhoneInput />
      </FieldGroup>
      <Button fullWidth type='button' onClick={handleNext}>
        To Delivery
      </Button>
    </div>
  )
}
