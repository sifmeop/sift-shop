import { LogOutIcon } from 'lucide-react'

import { useSignOutMutation } from '~/app/auth/sign-out'

import { ProfileMenuItem } from './ProfileMenuItem'

export const Logout = () => {
  const [mutate] = useSignOutMutation()

  return (
    <ProfileMenuItem
      as='button'
      name='Logout'
      icon={LogOutIcon}
      className='text-destructive'
      onClick={() => mutate()}
    />
  )
}
