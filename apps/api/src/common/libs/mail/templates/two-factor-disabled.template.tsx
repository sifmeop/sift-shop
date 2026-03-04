import React from 'react'

import {
  Body,
  Button,
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

interface TwoFactorDisabledTemplateProps {
  securityUrl: string
  signInUrl: string
}

export const TwoFactorDisabledTemplate = ({
  securityUrl,
  signInUrl
}: TwoFactorDisabledTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Two-factor authentication has been disabled</Preview>
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
                2FA has been disabled
              </Heading>
              <Text className='mb-0 mt-4 text-base leading-7 text-slate-600'>
                Two-factor authentication is no longer active for your account.
              </Text>
            </Section>

            <Section className='mx-8 rounded-xl border border-slate-200 bg-slate-50 p-6'>
              <Text className='m-0 text-sm leading-6 text-slate-700'>
                If this was not you, secure your account now:
              </Text>
              <Section className='py-6 text-center'>
                <Button
                  href={signInUrl}
                  className='rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white no-underline'>
                  Go to Sign In
                </Button>
              </Section>
              <Text className='m-0 text-sm leading-6 text-slate-700'>
                Then update your security settings:
              </Text>
              <Link
                href={securityUrl}
                className='mt-2 block break-all text-sm leading-6 text-indigo-600 underline'>
                {securityUrl}
              </Link>
            </Section>

            <Hr className='mx-8 my-8 border-slate-200' />

            <Text className='mx-8 mb-8 mt-0 text-xs leading-6 text-slate-500'>
              If you disabled 2FA intentionally, you can ignore this message.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
