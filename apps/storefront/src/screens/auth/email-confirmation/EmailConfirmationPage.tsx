import { EmailConfirmationForm } from '~/modules/auth'

interface EmailConfirmationPageProps {
  token: string
}

export const EmailConfirmationPage = ({
  token
}: EmailConfirmationPageProps) => {
  return <EmailConfirmationForm token={token} />
}
