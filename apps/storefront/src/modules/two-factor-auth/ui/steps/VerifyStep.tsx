'use client'

import { useState } from 'react'

import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '~/common/ui/Button'
import { InputOTP } from '~/common/ui/Input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { useEnableTwoFactorAuthMutation } from '../../hooks/useEnableTwoFactorAuthMutation'

const OTP_LENGTH = 6

interface VerifyStepProps {
  onNext: (step?: number) => void
}

export const VerifyStep = ({ onNext }: VerifyStepProps) => {
  const [enableTwoFactor, { loading, error }] = useEnableTwoFactorAuthMutation()

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))

  const handleVerify = async () => {
    const code = otp.join('')

    if (code.length < OTP_LENGTH) return

    try {
      await enableTwoFactor({ variables: { code } })
      onNext()
    } catch {
      handleGraphQLError(error)

      setOtp(Array(OTP_LENGTH).fill(''))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex flex-col items-center gap-6 sm:gap-8'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <div className='size-12 rounded-xl bg-muted border border-border grid place-items-center'>
          <ShieldCheck className='size-5 text-muted-foreground' />
        </div>
        <p className='max-w-xs text-sm text-muted-foreground'>
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <div className='w-full overflow-x-auto pb-1'>
        <InputOTP
          focus
          value={otp}
          onChange={setOtp}
          error={error?.message}
          disabled={loading}
        />
      </div>

      <Button
        className='w-full h-11 text-sm font-semibold gap-2'
        isLoading={loading}
        loadingMode='spinner-only'
        onClick={handleVerify}
        disabled={otp.join('').length < OTP_LENGTH}>
        Verify & Enable
      </Button>
    </motion.div>
  )
}
