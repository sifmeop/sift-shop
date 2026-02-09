import { useId, useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { cn } from '~/common/utils/cn'

import { Field, FieldError, FieldLabel } from './field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'
import { Show } from './show'

export const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-11.25 rounded-md border bg-transparent px-3.75 py-2.5 shadow-xs transition-[color,box-shadow,border] file:h-7 font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] file:text-foreground placeholder:text-muted-foreground placeholder:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-ring',
        className
      )}
      {...props}
    />
  )
}

interface EmailInputProps extends React.ComponentProps<'input'> {
  errorMessage?: string
}

export const EmailInput = ({ errorMessage, ...props }: EmailInputProps) => {
  const id = useId()
  const inputId = `input-${id}`

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>Email</FieldLabel>
      <Input
        id={inputId}
        type='email'
        name='email'
        autoComplete='email'
        aria-describedby='email-error'
        spellCheck={false}
        inputMode='email'
        placeholder='example@gmail.com'
        aria-invalid={!!errorMessage}
        {...props}
      />
      <Show when={!!errorMessage}>
        <FieldError>{errorMessage}</FieldError>
      </Show>
    </Field>
  )
}

interface PasswordInputProps extends React.ComponentProps<'input'> {
  variant?: 'current' | 'new'
  label: string
  errorMessage?: string
}

export const PasswordInput = ({
  variant,
  label,
  errorMessage,
  ...props
}: PasswordInputProps) => {
  const id = useId()
  const inputId = `input-${id}`

  const [showPassword, setShowPassword] = useState(false)

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const isNew = variant === 'new'

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          name='password'
          autoComplete={isNew ? 'new-password' : 'current-password'}
          aria-describedby='password-error password-hint'
          placeholder='Password'
          aria-invalid={!!errorMessage}
          {...props}
        />
        <InputGroupAddon
          align='inline-end'
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={handleToggleShowPassword}
          className='cursor-pointer'>
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupAddon>
      </InputGroup>
      <Show when={!!errorMessage}>
        <FieldError>{errorMessage}</FieldError>
      </Show>
    </Field>
  )
}
