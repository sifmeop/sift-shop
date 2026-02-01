import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/common/ui/alert-dialog'

interface EmailVerificationAlertProps {
  open: boolean
  onClose: () => void
}

export const EmailVerificationAlert = ({
  open,
  onClose
}: EmailVerificationAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verify your email</AlertDialogTitle>
          <AlertDialogDescription>
            We&apos;ve sent a verification link to your email. Please check your
            inbox and click the link to verify your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
