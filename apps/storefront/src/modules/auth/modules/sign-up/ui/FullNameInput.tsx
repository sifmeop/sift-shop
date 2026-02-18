import { useId } from 'react'

import { Field, FieldError, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'

interface FullNameInputProps extends React.ComponentProps<'input'> {
  errorMessage?: string
}

export const FullNameInput = ({
  errorMessage,
  ...props
}: FullNameInputProps) => {
  const id = useId()
  const inputId = `input-${id}`

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>Name</FieldLabel>
      <Input
        id={inputId}
        name='fullName'
        type='text'
        autoComplete='name'
        autoCapitalize='words'
        spellCheck='true'
        placeholder='John Doe'
        aria-describedby='fullName-error'
        aria-invalid={!!errorMessage}
        {...props}
      />
      <FieldError error={errorMessage} />
    </Field>
  )
}
