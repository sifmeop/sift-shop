import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '~/common/ui/button'
import { EmailInput } from '~/common/ui/input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'
import { FormContainer } from '~/modules/auth/ui/FormContainer'

import { useForgotPasswordMutation } from '../hooks/useForgotPasswordMutation'
import {
  ForgotPasswordFormData,
  forgotPasswordSchema
} from '../schemas/forgot-password.schema'

import { ForgotPasswordAlert } from './ForgotPasswordAlert'

export const ForgotPasswordForm = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [forgotPassword, { loading }] = useForgotPasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword({
        variables: { input: data }
      })
      setShowAlert(true)
      reset()
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  const handleClose = () => {
    setShowAlert(false)
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <p className='mb-6 text-foreground-70'>
            Please enter the email address associated with your account.
            We&apos;ll promptly send you a link to reset your password.
          </p>
          <EmailInput
            {...register('email')}
            errorMessage={errors.email?.message}
            className='mb-4'
          />
          <Button fullWidth type='submit' isLoading={loading}>
            Send reset link
          </Button>
        </form>
      </FormContainer>
      <ForgotPasswordAlert open={showAlert} onClose={handleClose} />
    </>
  )
}
