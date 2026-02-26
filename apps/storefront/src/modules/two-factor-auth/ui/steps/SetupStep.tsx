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
      className='flex flex-col items-center gap-6'>
      <div className='flex items-center gap-2 text-muted-foreground text-sm'>
        <SmartphoneIcon className='size-4 shrink-0' />
        <span>Scan with your authenticator app</span>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className='relative p-3 bg-white rounded-xl shadow-lg border border-border'>
        <QRCodeSVG value={data.generateTwoFactorSecret.otpAuthUrl} size={200} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='w-full'>
        <p className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2 text-center'>
          Or enter key manually
        </p>
        <div className='flex items-center gap-2 pl-4 p-2 bg-muted/50 border border-border rounded-lg'>
          <code className='flex-1 text-sm font-bold tracking-[0.18em] text-foreground select-all'>
            {data.generateTwoFactorSecret.secret}
          </code>
          <CopyButton data={data.generateTwoFactorSecret.secret} />
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
