import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { EmailInput, PasswordInput } from '~/common/ui/input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'
import { AuthPrompt } from '~/modules/auth/ui/AuthPrompt'
import { FormContainer } from '~/modules/auth/ui/FormContainer'
import { SocialAuth } from '~/modules/auth/ui/SocialAuth'

import { useSignInMutation } from '../hooks/useSignInMutation'
import { SignInFormData, signInSchema } from '../schemas/sign-in.schema'

import { ForgotPassword } from './ForgotPassword'

export const SignInForm = () => {
  const [signIn, { loading }] = useSignInMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn({
        variables: { input: data }
      })
      router.push(ROUTES.HOME)
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <SocialAuth />
        <div className='space-y-3.75 mb-4'>
          <EmailInput
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <PasswordInput {...register('password')} label='Password' />
        </div>
        <ForgotPassword />
        <Button fullWidth type='submit' className='mb-6' isLoading={loading}>
          Sign In
        </Button>
        <AuthPrompt variant='signIn' />
      </form>
    </FormContainer>
  )
}
