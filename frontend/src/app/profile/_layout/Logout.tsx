import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'

import { ProfileMenuItem } from './ProfileMenuItem'

export const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push(ROUTES.HOME)
  }

  return (
    <ProfileMenuItem
      as='button'
      name='Logout'
      icon={LogOutIcon}
      className='text-destructive'
      onClick={handleLogout}
    />
  )
}
