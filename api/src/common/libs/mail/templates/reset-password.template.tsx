import * as React from 'react'

import { Body, Heading, Link, Text } from '@react-email/components'
import { Html } from '@react-email/html'

interface ResetPasswordTemplateProps {
  domain: string
  token: string
}

export const ResetPasswordTemplate = ({
  domain,
  token
}: ResetPasswordTemplateProps) => {
  const resetPasswordLink = `${domain}/auth/reset-password?token=${token}`

  return (
    <Html>
      <Body>
        <Heading>Reset your password</Heading>
        <Text>To reset your password, please click the following link:</Text>
        <Link href={resetPasswordLink}>Reset</Link>
        <Text>Expires in 1 hour</Text>
      </Body>
    </Html>
  )
}
