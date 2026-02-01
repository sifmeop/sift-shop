import { useId } from 'react'

import { Field, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'

export const FullNameInput = (props: React.ComponentProps<'input'>) => {
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
        {...props}
      />
    </Field>
  )
}
