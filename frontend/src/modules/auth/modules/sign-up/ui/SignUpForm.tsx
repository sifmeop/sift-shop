import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '~/common/ui/button'
import { EmailInput, PasswordInput } from '~/common/ui/input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'
import { AuthPrompt } from '~/modules/auth/ui/AuthPrompt'
import { FormContainer } from '~/modules/auth/ui/FormContainer'
import { SocialAuth } from '~/modules/auth/ui/SocialAuth'

import { useSignUpMutation } from '../hooks/useSignUpMutation'
import { SignUpFormData, signUpSchema } from '../schemas/sign-up.schema'

import { EmailVerificationAlert } from './EmailVerificationAlert'
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
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  const handleClose = () => {
    setShowAlert(false)
    reset()
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <SocialAuth />
          <div className='space-y-3.75 mb-6'>
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
          <Button fullWidth className='mb-6' isLoading={loading}>
            Create account
          </Button>
          <AuthPrompt variant='signUp' />
        </form>
      </FormContainer>
      <EmailVerificationAlert open={showAlert} onClose={handleClose} />
    </>
  )
}
