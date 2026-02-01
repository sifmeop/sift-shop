import { Button } from '~/common/ui/button'
import { Field, FieldLabel } from '~/common/ui/field'
import { Input } from '~/common/ui/input'
import { FormContainer } from '~/modules/auth/ui/FormContainer'

export const ResetPasswordForm = () => {
  return (
    <FormContainer>
      <div className='space-y-3.75 mb-6'>
        <Field>
          <FieldLabel>New Password</FieldLabel>
          <Input placeholder='Password' />
        </Field>
        <Field>
          <FieldLabel>Confirm password</FieldLabel>
          <Input placeholder='Password' />
        </Field>
      </div>
      <Button fullWidth>Reset password</Button>
    </FormContainer>
  )
}
