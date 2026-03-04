'use client'

import { useState } from 'react'

import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '~/common/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '~/common/ui/Dialog'
import { InputOTP } from '~/common/ui/Input'

const OTP_LENGTH = 6

interface TwoFactorDialogInputProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  setCode: (code: string) => void
  onSubmit: () => void
}

export const TwoFactorDialogInput = ({
  open,
  onOpenChange,
  setCode,
  onSubmit
}: TwoFactorDialogInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))

  const handleSubmit = async () => {
    const code = otp.join('')
    if (code.length < OTP_LENGTH) return
    onOpenChange(false)
    onSubmit()
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setOtp(Array(OTP_LENGTH).fill(''))
      setCode('')
    }
    onOpenChange(value)
  }

  const handleChangeCode = (value: string[]) => {
    setOtp(value)
    setCode(value.join(''))
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center gap-3 mb-1'>
            <div className='size-9 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center shrink-0'>
              <ShieldCheck className='size-4 text-primary' />
            </div>
            <div>
              <DialogTitle>Two-Factor Authentication</DialogTitle>
              <DialogDescription className='mt-0.5'>
                Enter the code from your authenticator app
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className='flex flex-col items-center gap-6 py-2'>
          <InputOTP value={otp} onChange={handleChangeCode} />

          <Button
            type='button'
            disabled={otp.join('').length < OTP_LENGTH}
            className='w-full h-11 text-sm font-semibold gap-2'
            onClick={handleSubmit}>
            Verify
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
