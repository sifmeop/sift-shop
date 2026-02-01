import { Button } from '~/common/ui/button'
import { Field, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'
import { FormContainer } from '~/modules/auth/ui/FormContainer'

export const ForgotPasswordForm = () => {
  return (
    <FormContainer>
      <p className='mb-6 text-foreground-70'>
        Please enter the email address associated with your account. We&apos;ll
        promptly send you a link to reset your password.
      </p>
      <Field className='mb-6'>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder='example@gmail.com' />
      </Field>
      <Button fullWidth>Send reset link</Button>
    </FormContainer>
  )
}
