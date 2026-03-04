import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '~/common/ui/Button'

interface DoneStepProps {
  onNext: (step?: number) => void
}

export const DoneStep = ({ onNext }: DoneStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex flex-col items-center gap-5 py-2 text-center sm:gap-6 sm:py-4'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className='relative grid size-16 place-items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10'>
        <ShieldCheck className='size-7 text-emerald-500' />
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          className='absolute inset-0 rounded-2xl bg-emerald-500/10'
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='flex flex-col gap-2'>
        <h2 className='text-foreground text-lg font-semibold'>2FA Enabled</h2>
        <p className='text-muted-foreground max-w-xs text-sm leading-relaxed'>
          Your account is now protected. You&apos;ll be asked for a code every
          time you log in.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className='w-full rounded-xl border border-border bg-muted/50 p-4 text-left'>
        <p className='mb-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground'>
          Important
        </p>
        <p className='text-xs leading-relaxed text-muted-foreground'>
          Save your secret key somewhere safe - you&apos;ll need it to recover
          access if you lose your authenticator app.
        </p>
      </motion.div>

      <motion.div
        className='w-full'
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}>
        <Button
          onClick={() => onNext()}
          className='h-11 w-full text-sm font-semibold'>
          Done
        </Button>
      </motion.div>
    </motion.div>
  )
}
