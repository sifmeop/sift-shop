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
      <Head />
      <Preview>Confirm your email to activate your Sift Shop account</Preview>
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
                Confirm your email
              </Heading>
              <Text className='mb-0 mt-4 text-base leading-7 text-slate-600'>
                One more step to secure your account and start using all store
                features.
              </Text>
            </Section>

            <Section className='mx-8 rounded-xl border border-slate-200 bg-slate-50 p-6 max-w-[calc(100%-4rem)]'>
              <Text className='w-full m-0 text-sm leading-6 text-slate-700'>
                Click the button below to verify your email address:
              </Text>
              <Section className='py-6 text-center'>
                <Button
                  href={confirmationLink}
                  className='rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white no-underline'>
                  Confirm Email
                </Button>
              </Section>
              <Text className='m-0 text-sm leading-6 text-slate-700'>
                This link expires in <strong>1 hour</strong>. If the button does
                not work, copy and paste this URL into your browser:
              </Text>
              <Link
                href={confirmationLink}
                className='mt-3 block break-all text-sm leading-6 text-indigo-600 underline'>
                {confirmationLink}
              </Link>
            </Section>

            <Hr className='mx-8 my-8 border-slate-200' />

            <Text className='mx-8 mb-8 mt-0 text-xs leading-6 text-slate-500'>
              If you did not create an account, you can safely ignore this
              message.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
