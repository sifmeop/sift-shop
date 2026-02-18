'use client'

import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { env } from '~/common/constants/env'
import { Button } from '~/common/ui/button'
import { Field, FieldError } from '~/common/ui/field'
import { EmailInput, PasswordInput } from '~/common/ui/input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'
import { AuthPrompt } from '~/modules/auth/ui/AuthPrompt'
import { FormContainer } from '~/modules/auth/ui/FormContainer'
import { SocialAuth } from '~/modules/auth/ui/SocialAuth'

import { useSignUpMutation } from '../hooks/useSignUpMutation'
import { SignUpFormData, signUpSchema } from '../schemas/sign-up.schema'

import { EmailConfirmationAlert } from './EmailConfirmationAlert'
import { FullNameInput } from './FullNameInput'

export const SignUpForm = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [signUp, { loading }] = useSignUpMutation()
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      recaptha: ''
    },
    resolver: zodResolver(signUpSchema)
  })

  // eslint-disable-next-line react-hooks/refs
  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        variables: { input: data }
      })
      setShowAlert(true)
      reset()
      recaptchaRef.current?.reset()
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  const handleClose = () => {
    setShowAlert(false)
  }

  const onChangeRecaptcha = (value: string | null) => {
    if (!value) {
      return
    }

    setValue('recaptha', value)
    setError('recaptha', { message: '' })
  }

  const onExpiredRecaptcha = () => {
    setValue('recaptha', '')
    setError('recaptha', {
      message: 'Recaptcha token is required'
    })
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={onSubmit} className='space-y-6'>
          <SocialAuth />
          <div className='space-y-3.75'>
            <FullNameInput
              {...register('fullName')}
              errorMessage={errors.fullName?.message}
            />
            <EmailInput
              {...register('email')}
              errorMessage={errors.email?.message}
            />
            <PasswordInput
              {...register('password')}
              name='password'
              variant='new'
              label='Password'
              errorMessage={errors.password?.message}
            />
            <PasswordInput
              {...register('confirmPassword')}
              name='confirmPassword'
              variant='new'
              label='Confirm password'
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
          <Field>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onChangeRecaptcha}
              onExpired={onExpiredRecaptcha}
              className='[&>div]:mx-auto [&>div]:w-fit'
            />
            <FieldError error={errors.recaptha?.message} />
          </Field>
          <Button fullWidth isLoading={loading}>
            Create account
          </Button>
          <AuthPrompt variant='signUp' />
        </form>
      </FormContainer>
      <EmailConfirmationAlert open={showAlert} onClose={handleClose} />
    </>
  )
}
