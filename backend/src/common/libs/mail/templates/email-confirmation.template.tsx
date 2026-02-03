import * as React from 'react'

import { Body, Heading, Link, Text } from '@react-email/components'
import { Html } from '@react-email/html'

interface EmailConfirmationTemplateProps {
  domain: string
  token: string
}

export const EmailConfirmationTemplate = ({
  domain,
  token
}: EmailConfirmationTemplateProps) => {
  const confirmationLink = `${domain}/auth/email-confirmation?token=${token}`

  return (
    <Html>
      <Body>
        <Heading>Confirm your email</Heading>
        <Text>To confirm your email, please click the following link: </Text>
        <Link href={confirmationLink}>Confirm</Link>
        <Text>Expires in 1 hour</Text>
      </Body>
    </Html>
  )
}
