import { GoogleButton } from '../modules/oauth/ui/GoogleButton'

import { AuthDivider } from './AuthDivider'

export const SocialAuth = () => {
  return (
    <div className='space-y-5 mb-5'>
      <GoogleButton />
      <AuthDivider />
    </div>
  )
}
