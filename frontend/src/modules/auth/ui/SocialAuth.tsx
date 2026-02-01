import { AuthDivider } from './AuthDivider'
import { OAuthButton } from './OAuthButton'

export const SocialAuth = () => {
  return (
    <div className='space-y-6 mb-8'>
      <OAuthButton provider='google' />
      <AuthDivider />
    </div>
  )
}
