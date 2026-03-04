'use client'

import { useEffect, useId, useRef, useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '~/common/utils/cn'

import { Field, FieldError, FieldLabel } from './Field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './InputGroup'

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

export const EmailInput = ({
  error,
  ...props
}: React.ComponentProps<'input'> & {
  error?: string
}) => {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Email</FieldLabel>
      <Input
        id={id}
        type='email'
        name='email'
        autoComplete='email'
        aria-describedby='email-error'
        spellCheck={false}
        inputMode='email'
        placeholder='example@gmail.com'
        aria-invalid={!!error}
        {...props}
      />
      <FieldError error={error} />
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

const OTP_LENGTH = 6

interface InputOTPProps {
  focus?: boolean
  value: string[]
  onChange: (value: string[]) => void
  error?: string | null
  disabled?: boolean
}

export const InputOTP = ({
  focus,
  value,
  onChange,
  error,
  disabled
}: InputOTPProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsErrorVisible(true)
    }
  }, [error])

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...value]
    next[index] = val.slice(-1)
    onChange(next)
    setIsErrorVisible(false)

    if (val && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)
    if (pasted.length === OTP_LENGTH) {
      onChange(pasted.split(''))
      setIsErrorVisible(false)
      inputsRef.current[OTP_LENGTH - 1]?.focus()
    }
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='flex gap-2' onPaste={handlePaste}>
        {value.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el
              if (focus && i === 0) el?.focus()
            }}
            type='text'
            inputMode='numeric'
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            animate={isErrorVisible ? { x: [0, -5, 5, -4, 4, 0] } : {}}
            transition={{ duration: 0.35 }}
            disabled={disabled}
            className={cn(
              'size-12 text-center text-xl font-bold rounded-xl border bg-muted/50 text-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-transparent focus:scale-105 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100',
              isErrorVisible
                ? 'border-destructive text-destructive'
                : digit
                  ? 'border-border'
                  : 'border-border/60'
            )}
          />
        ))}
      </div>

      <AnimatePresence>
        {isErrorVisible && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className='text-xs text-destructive'>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
