import { useFormContext } from 'react-hook-form'

import { Button } from '~/common/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'
import { prettifyCamelCase } from '~/common/utils/prettifyCamelCase'

import { CheckoutFormData } from '../../schemas/checkout.schema'

interface ContactStepProps {
  onNext: () => void
}

export const ContactStep = ({ onNext }: ContactStepProps) => {
  const {
    trigger,
    register,
    formState: { errors }
  } = useFormContext<CheckoutFormData>()

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
        {(['firstName', 'lastName', 'phone', 'email'] as const).map(
          (fieldName) => {
            const error = errors[fieldName]?.message
            const isInvalid = !!error
            const label = prettifyCamelCase(fieldName)
            const placeholder = `Enter your ${label.toLowerCase()}`

            return (
              <Field key={fieldName} aria-invalid={isInvalid}>
                <FieldLabel aria-invalid={isInvalid}>{label}</FieldLabel>
                <Input
                  {...register(fieldName)}
                  placeholder={placeholder}
                  aria-invalid={isInvalid}
                  aria-describedby={`${fieldName}-error`}
                />
                <FieldError id={`${fieldName}-error`} error={error} />
              </Field>
            )
          }
        )}
      </FieldGroup>
      <Button fullWidth type='button' onClick={handleNext}>
        To Delivery
      </Button>
    </div>
  )
}
