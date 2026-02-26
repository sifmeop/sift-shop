import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '~/common/ui/button'

interface DoneStepProps {
  onNext: (step?: number) => void
}

export const DoneStep = ({ onNext }: DoneStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='flex flex-col items-center gap-6 text-center py-4'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className='relative size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center'>
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
        <p className='text-muted-foreground text-sm leading-relaxed max-w-xs'>
          Your account is now protected. You&apos;ll be asked for a code every
          time you log in.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className='w-full p-4 bg-muted/50 border border-border rounded-xl text-left'>
        <p className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-1'>
          Important
        </p>
        <p className='text-xs text-muted-foreground leading-relaxed'>
          Save your secret key somewhere safe — you&apos;ll need it to recover
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
          className='w-full h-11 text-sm font-semibold'>
          Done
        </Button>
      </motion.div>
    </motion.div>
  )
}
