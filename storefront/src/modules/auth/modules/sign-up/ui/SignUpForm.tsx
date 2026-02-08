import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { env } from '~/common/constants/env'
import { Button } from '~/common/ui/button'
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        variables: { input: data }
      })
      toast.success('Account created successfully')
      setShowAlert(true)
      reset()
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  const handleClose = () => {
    setShowAlert(false)
  }

  function onChange(value: string | null) {
    console.log('Captcha value:', value)
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={onSubmit} className='space-y-6'>
          <SocialAuth />
          <div className='space-y-3.75'>
            <FullNameInput {...register('fullName')} />
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
          <ReCAPTCHA
            sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
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
