import { useFormContext } from 'react-hook-form'

import { Button } from '~/common/ui/button'
import { Field, FieldError, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'

import { useFetchCities } from '../../hooks/useFetchCities'
import { CheckoutFormData } from '../../schemas/checkout.schema'

const DEFAULT_CITIES = [
  { label: 'Kiev' },
  { label: 'Kharkiv' },
  { label: 'Odessa' },
  { label: 'Dnipro' },
  { label: 'Zaporizhzhia' },
  { label: 'Lviv' }
]

interface DeliveryStepProps {
  onNext: () => void
}

export const DeliveryStep = ({ onNext }: DeliveryStepProps) => {
  const {
    control,
    trigger,
    setValue,
    formState: { errors }
  } = useFormContext<CheckoutFormData>()

  const { rawValue, setRawValue, cities } = useFetchCities()

  const isInvalid = !!errors.city?.message

  const handleNext = async () => {
    const isValid = await trigger(['city'], {
      shouldFocus: true
    })

    if (isValid) {
      onNext()
    }
  }

  return (
    <div className='flex flex-col justify-between flex-1 gap-4'>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-3 gap-4'>
          {DEFAULT_CITIES.map(({ label }) => (
            <Button
              key={label}
              variant='outline'
              onClick={() => setValue('city', label)}>
              {label}
            </Button>
          ))}
        </div>
        <Field aria-invalid={isInvalid}>
          <FieldLabel aria-invalid={isInvalid}>City</FieldLabel>
          <Input
            aria-invalid={isInvalid}
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            placeholder='Enter your city'
          />
          <FieldError error={errors.city?.message} />
        </Field>
      </div>
      <Button fullWidth type='button' onClick={handleNext}>
        To Payment
      </Button>
    </div>
  )
}
