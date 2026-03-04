'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CombinedGraphQLErrors } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '~/common/ui/Button'
import { EmailInput, PasswordInput } from '~/common/ui/Input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'
import { AuthPrompt } from '~/modules/auth/ui/AuthPrompt'
import { FormContainer } from '~/modules/auth/ui/FormContainer'
import { SocialAuth } from '~/modules/auth/ui/SocialAuth'

import { useSignInMutation } from '../hooks/useSignInMutation'
import { SignInFormData, signInSchema } from '../schemas/sign-in.schema'

import { ForgotPassword } from './ForgotPassword'
import { TwoFactorDialogInput } from './TwoFactorDialogInput'

export const SignInForm = () => {
  const [signIn, { loading }] = useSignInMutation()

  const [twoFactorRequired, setTwoFactorRequired] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
      code: ''
    },
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn({
        variables: {
          input: data
        }
      })
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const extensions = error.errors[0].extensions

        if (extensions && 'code' in extensions) {
          if (extensions.code === 'TWO_FACTOR_REQUIRED') {
            setTwoFactorRequired(true)
            return
          }
        }
      }

      handleGraphQLError(error)
    }
  })

  return (
    <>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <SocialAuth />
          <div className='space-y-3.75 mb-4'>
            <EmailInput {...register('email')} error={errors.email?.message} />
            <PasswordInput {...register('password')} label='Password' />
          </div>
          <ForgotPassword />
          <Button fullWidth type='submit' className='mb-6' isLoading={loading}>
            Sign In
          </Button>
          <AuthPrompt variant='signIn' />
        </form>
      </FormContainer>
      <TwoFactorDialogInput
        open={twoFactorRequired}
        onOpenChange={setTwoFactorRequired}
        setCode={(code) => setValue('code', code)}
        onSubmit={onSubmit}
      />
    </>
  )
}
