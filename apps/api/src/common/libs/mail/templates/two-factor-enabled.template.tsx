import React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

interface TwoFactorEnabledTemplateProps {
  securityUrl: string
}

export const TwoFactorEnabledTemplate = ({
  securityUrl
}: TwoFactorEnabledTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Two-factor authentication has been enabled</Preview>
      <Tailwind>
        <Body className='bg-slate-100 py-10 font-sans'>
          <Container className='mx-auto max-w-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
            <Section className='bg-black py-4 text-center'>
              <Text className='m-0 text-base font-black uppercase tracking-[0.22em] text-white'>
                Sift-Shop
              </Text>
            </Section>

            <Section className='p-8 pt-7 text-center'>
              <Heading className='m-0 text-3xl font-bold leading-tight text-slate-900'>
                2FA is now enabled
              </Heading>
              <Text className='mb-0 mt-4 text-base leading-7 text-slate-600'>
                Your account is now protected with two-factor authentication.
                You will need a verification code during sign in.
              </Text>
            </Section>

            <Section className='mx-8 rounded-xl border border-slate-200 bg-slate-50 p-6'>
              <Text className='m-0 text-sm leading-6 text-slate-700'>
                If this was you, no further action is required.
              </Text>
              <Text className='m-0 mt-3 text-sm leading-6 text-slate-700'>
                You can manage your security settings here:
              </Text>
              <Link
                href={securityUrl}
                className='mt-2 block break-all text-sm leading-6 text-indigo-600 underline'>
                {securityUrl}
              </Link>
            </Section>

            <Hr className='mx-8 my-8 border-slate-200' />

            <Text className='mx-8 mb-8 mt-0 text-xs leading-6 text-slate-500'>
              If you did not enable 2FA, change your password immediately and
              contact support.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
