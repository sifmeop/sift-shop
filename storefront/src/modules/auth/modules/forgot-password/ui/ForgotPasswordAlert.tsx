import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/common/ui/alert-dialog'

interface ForgotPasswordAlertProps {
  open: boolean
  onClose: () => void
  email?: string
}

export const ForgotPasswordAlert = ({
  open,
  onClose,
  email
}: ForgotPasswordAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Check your email</AlertDialogTitle>
          <AlertDialogDescription>
            We&apos;ve sent a password reset link
            {email ? (
              <>
                {' '}
                to <span className='text-foreground font-medium'>{email}</span>
              </>
            ) : null}
            . Please check your inbox and click the link to reset your password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
