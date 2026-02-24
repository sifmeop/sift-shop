import { useFormContext } from 'react-hook-form'

import { Button } from '~/common/ui/button'
import { Field, FieldError, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'
import { prettifyCamelCase } from '~/common/utils/prettifyCamelCase'

import { CheckoutFormData } from '../../schemas/checkout.schema'

interface DeliveryStepProps {
  onNext: () => void
}

export const DeliveryStep = ({ onNext }: DeliveryStepProps) => {
  const {
    register,
    trigger,
    formState: { errors }
  } = useFormContext<CheckoutFormData>()

  const handleNext = async () => {
    const isValid = await trigger(['country', 'city', 'state', 'zipCode'], {
      shouldFocus: true
    })
    if (isValid) onNext()
  }

  return (
    <div className='flex flex-col justify-between flex-1 gap-4'>
      <div className='grid grid-cols-2 gap-x-4 gap-y-2 items-end'>
        {(['country', 'city', 'state', 'address', 'zipCode'] as const).map(
          (fieldName) => {
            const error = errors[fieldName]?.message
            const isInvalid = !!error
            const label = prettifyCamelCase(fieldName)
            const placeholder = `Enter your ${label.toLowerCase()}`
            const inputMode = fieldName === 'zipCode' ? 'numeric' : undefined

            return (
              <Field key={fieldName} aria-invalid={isInvalid}>
                <FieldLabel aria-invalid={isInvalid}>{label}</FieldLabel>
                <Input
                  {...register(fieldName)}
                  placeholder={placeholder}
                  aria-invalid={isInvalid}
                  aria-describedby={`${fieldName}-error`}
                  inputMode={inputMode}
                />
                <FieldError id={`${fieldName}-error`} error={error} />
              </Field>
            )
          }
        )}
        <Button fullWidth type='button' onClick={handleNext}>
          To Payment
        </Button>
      </div>
    </div>
  )
}
