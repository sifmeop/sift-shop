import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '~/common/ui/button'
import { Field, FieldError, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'

import { CheckoutFormData } from '../../schemas/checkout.schema'

interface DeliveryStepProps {
  onNext: () => void
}

export const DeliveryStep = ({ onNext }: DeliveryStepProps) => {
  const { control, trigger } = useFormContext<CheckoutFormData>()

  const handleNext = async () => {
    const isValid = await trigger(['country', 'city', 'state', 'zipCode'], {
      shouldFocus: true
    })
    if (isValid) onNext()
  }

  return (
    <div className='flex flex-col justify-between flex-1 gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        {['country', 'city', 'state', 'zipCode'].map((fieldName) => (
          <Controller
            key={fieldName}
            name={fieldName as keyof CheckoutFormData}
            control={control}
            render={({ field, fieldState }) => {
              const isInvalid = fieldState.invalid
              const label =
                fieldName === 'zipCode'
                  ? 'Zip Code'
                  : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
              const placeholder = `Enter your ${label.toLowerCase()}`
              const type = fieldName === 'zipCode' ? 'text' : 'text'
              const pattern = fieldName === 'zipCode' ? '\\d{5,10}' : undefined

              return (
                <Field aria-invalid={isInvalid}>
                  <FieldLabel aria-invalid={isInvalid}>{label}</FieldLabel>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={placeholder}
                    aria-invalid={isInvalid}
                    aria-describedby={`${fieldName}-error`}
                    type={type}
                    pattern={pattern}
                    inputMode={fieldName === 'zipCode' ? 'numeric' : undefined}
                    required
                  />
                  <FieldError
                    id={`${fieldName}-error`}
                    error={fieldState.error?.message}
                  />
                </Field>
              )
            }}
          />
        ))}
      </div>
      <Button fullWidth type='button' onClick={handleNext}>
        To Payment
      </Button>
    </div>
  )
}
