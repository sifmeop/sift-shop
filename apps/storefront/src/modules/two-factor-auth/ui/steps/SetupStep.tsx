import { SmartphoneIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'

import { Button, CopyButton } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'

import { useGenerateTwoFactorSecretQuery } from '../../hooks/useGenerateTwoFactorSecretQuery'

interface SetupStepProps {
  onNext: (step?: number) => void
}

export const SetupStep = ({ onNext }: SetupStepProps) => {
  const { data, loading, error } = useGenerateTwoFactorSecretQuery()

  if (error) {
    return (
      <p className='text-center font-medium'>
        Something went wrong, please try again later
      </p>
    )
  }

  if (!data || loading) {
    return <CenterLoader />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex flex-col items-center gap-5 sm:gap-6'>
      <div className='flex items-center gap-2 text-center text-sm text-muted-foreground'>
        <SmartphoneIcon className='size-4 shrink-0' />
        <span>Scan with your authenticator app</span>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className='relative rounded-xl border border-border bg-white p-3 shadow-lg'>
        <QRCodeSVG
          value={data.generateTwoFactorSecret.otpAuthUrl}
          size={180}
          className='sm:size-[200px]'
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='w-full'>
        <p className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2 text-center'>
          Or enter key manually
        </p>
        <div className='flex flex-col gap-2 rounded-lg border border-border bg-muted/50 p-2 sm:flex-row sm:items-center sm:gap-3 sm:pl-4'>
          <code className='min-w-0 flex-1 break-all text-center text-xs font-bold tracking-[0.12em] text-foreground select-all sm:text-left sm:text-sm sm:tracking-[0.18em]'>
            {data.generateTwoFactorSecret.secret}
          </code>
          <CopyButton
            data={data.generateTwoFactorSecret.secret}
            className='w-full sm:w-auto'
          />
        </div>
      </motion.div>

      <motion.div
        className='w-full'
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        <Button
          onClick={() => onNext()}
          className='w-full h-11 text-sm font-semibold tracking-wide gap-2 group'>
          I&apos;ve scanned the code
        </Button>
      </motion.div>
    </motion.div>
  )
}
