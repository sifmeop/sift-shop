import { useState } from 'react'

import { ShieldOff } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '~/common/ui/button'
import { InputOTP } from '~/common/ui/input'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { useDisableTwoFactorAuthMutation } from '../../hooks/useDisableTwoFactorAuthMutation'

const OTP_LENGTH = 6

interface DisableStepProps {
  onNext: (step?: number) => void
}

export const DisableStep = ({ onNext }: DisableStepProps) => {
  const [disableTwoFactor, { loading, error }] =
    useDisableTwoFactorAuthMutation()

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))

  const handleDisable = async () => {
    const code = otp.join('')
    if (code.length < OTP_LENGTH) return
    try {
      await disableTwoFactor({ variables: { code } })
      onNext(0)
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
        <div className='size-12 rounded-xl bg-destructive/10 border border-destructive/20 grid place-items-center'>
          <ShieldOff className='size-5 text-destructive' />
        </div>
        <h2 className='text-foreground font-semibold'>Disable 2FA</h2>
        <p className='text-muted-foreground text-sm max-w-xs'>
          Enter the 6-digit code from your authenticator app to confirm.
        </p>
      </div>

      <div className='w-full overflow-x-auto pb-1'>
        <InputOTP focus value={otp} onChange={setOtp} error={error?.message} />
      </div>

      <Button
        variant='destructive'
        onClick={handleDisable}
        disabled={otp.join('').length < OTP_LENGTH}
        className='w-full h-11 text-sm font-semibold gap-2'
        isLoading={loading}
        loadingMode='spinner-only'>
        Disable 2FA
      </Button>
    </motion.div>
  )
}
