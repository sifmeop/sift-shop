import {
  HeartIcon,
  KeyRoundIcon,
  LucideIcon,
  ShoppingCart,
  UserIcon
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'

import { Logout } from './Logout'
import { ProfileMenuItem } from './ProfileMenuItem'

interface ProfileMenuItemProps {
  name: string
  href: string
  icon: LucideIcon
}

const links: ProfileMenuItemProps[] = [
  {
    name: 'Orders',
    href: ROUTES.ORDERS,
    icon: ShoppingCart
  },
  {
    name: 'Wishlist',
    href: ROUTES.WISHLIST,
    icon: HeartIcon
  },
  {
    name: 'Account Details',
    href: ROUTES.ACCOUNT_DETAIL,
    icon: UserIcon
  },
  {
    name: '2FA',
    href: ROUTES.TWO_FACTOR_AUTH,
    icon: KeyRoundIcon
  }
]

export const ProfileNavigation = () => {
  const pathname = usePathname()

  return (
    <ul className='mt-0 flex w-full gap-2 overflow-x-auto pb-1 lg:mt-15 lg:block lg:w-auto lg:space-y-4 lg:overflow-visible lg:pb-0'>
      {links.map((link) => (
        <ProfileMenuItem
          as={Link}
          key={link.href}
          isActive={pathname === link.href}
          {...link}
        />
      ))}
      <Logout />
    </ul>
  )
}
