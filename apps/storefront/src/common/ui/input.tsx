'use client'

import { useId, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { cn } from '~/common/utils/cn'

import { Field, FieldError, FieldLabel } from './field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from './input-group'

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

export const EmailInput = ({ ...props }: React.ComponentProps<'input'>) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<{ email: string }>()
  const id = useId()
  const errorMessage = errors.email?.message

  return (
    <Field>
      <FieldLabel htmlFor={id}>Email</FieldLabel>
      <Input
        {...register('email')}
        id={id}
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
      <FieldError error={errorMessage} />
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

  const [showPassword, setShowPassword] = useState(false)

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const isNew = variant === 'new'

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
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
      <FieldError error={errorMessage} />
    </Field>
  )
}

export const FirstNameInput = ({ ...props }: React.ComponentProps<'input'>) => {
  const id = useId()
  const { control } = useFormContext()

  return (
    <Controller
      name='firstName'
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <Field aria-invalid={isInvalid}>
            <FieldLabel htmlFor={id} aria-invalid={isInvalid}>
              First Name
            </FieldLabel>
            <Input
              id={id}
              aria-invalid={isInvalid}
              placeholder='John'
              {...field}
              {...props}
            />
            <FieldError error={fieldState.error?.message} />
          </Field>
        )
      }}
    />
  )
}

export const LastNameInput = ({ ...props }: React.ComponentProps<'input'>) => {
  const id = useId()
  const { control } = useFormContext()

  return (
    <Controller
      name='lastName'
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <Field aria-invalid={isInvalid}>
            <FieldLabel htmlFor={id} aria-invalid={isInvalid}>
              Last Name
            </FieldLabel>
            <Input
              id={id}
              aria-invalid={isInvalid}
              {...field}
              placeholder='Doe'
              {...props}
            />
            <FieldError error={fieldState.error?.message} />
          </Field>
        )
      }}
    />
  )
}

export const PhoneInput = ({ ...props }: React.ComponentProps<'input'>) => {
  const id = useId()
  const { control } = useFormContext()

  const formatPhone = (digits: string) => {
    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const digits = e.target.value.replace(/\D/g, '')

    if (digits.length > 9) return

    onChange(formatPhone(digits))
  }

  return (
    <Controller
      name='phone'
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <Field aria-invalid={isInvalid}>
            <FieldLabel htmlFor={id} aria-invalid={isInvalid}>
              Phone
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>+380</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id={id}
                aria-invalid={isInvalid}
                placeholder='XX-XXX-XXXX'
                type='tel'
                inputMode='numeric'
                autoComplete='tel'
                value={field.value}
                onChange={(e) => handleChange(e, field.onChange)}
                {...props}
              />
            </InputGroup>
            <FieldError error={fieldState.error?.message} />
          </Field>
        )
      }}
    />
  )
}
