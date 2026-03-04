'use client'

import { FormProvider } from 'react-hook-form'

import { Button } from '~/common/ui/Button'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/common/ui/Field'
import { Input } from '~/common/ui/Input'
import { cn } from '~/common/utils/cn'
import { prettifyCamelCase } from '~/common/utils/prettifyCamelCase'

import { useAccountDetailsForm } from '../hooks/useAccountDetailsForm'

export const AccountDetailsForm = () => {
  const { form, onSubmit, isLoading } = useAccountDetailsForm()

  const errors = form.formState.errors

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className={cn(
          'flex flex-1 flex-col justify-between gap-4 transition-opacity duration-300',
          {
            'opacity-50 pointer-events-none': isLoading
          }
        )}>
        <FieldGroup className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {(
            [
              'firstName',
              'lastName',
              'email',
              'phone',
              'country',
              'city',
              'state',
              'address',
              'zipCode'
            ] as const
          ).map((fieldName) => {
            const error = errors[fieldName]?.message
            const isInvalid = !!error
            const label = prettifyCamelCase(fieldName)
            const placeholder = `Enter your ${label.toLowerCase()}`
            const inputMode =
              fieldName === 'phone' || fieldName === 'zipCode'
                ? 'numeric'
                : undefined

            return (
              <Field key={fieldName} aria-invalid={isInvalid}>
                <FieldLabel aria-invalid={isInvalid}>{label}</FieldLabel>
                <Input
                  {...form.register(fieldName)}
                  placeholder={placeholder}
                  aria-invalid={isInvalid}
                  aria-describedby={`${fieldName}-error`}
                  inputMode={inputMode}
                />
                <FieldError id={`${fieldName}-error`} error={error} />
              </Field>
            )
          })}
        </FieldGroup>
        <Button fullWidth type='submit' isLoading={isLoading}>
          Save
        </Button>
      </form>
    </FormProvider>
  )
}
