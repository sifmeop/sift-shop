'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { PasswordInput } from '~/common/ui/input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'
import { FormContainer } from '~/modules/auth/ui/FormContainer'

import { useResetPasswordMutation } from '../hooks/useResetPasswordMutation'
import {
  ResetPasswordFormData,
  resetPasswordSchema
} from '../schemas/reset-password.schema'

interface ResetPasswordFormProps {
  token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [resetPassword, { loading }] = useResetPasswordMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const input = {
        token,
        password: data.password
      }

      await resetPassword({
        variables: { input }
      })
      toast.success('Password reset successfully')
      router.push(ROUTES.SIGN_IN)
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <div className='space-y-3.75 mb-6'>
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
        <Button fullWidth type='submit' isLoading={loading}>
          Reset password
        </Button>
      </form>
    </FormContainer>
  )
}
