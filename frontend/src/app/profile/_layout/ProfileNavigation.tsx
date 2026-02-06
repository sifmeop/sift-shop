import {
  HeartIcon,
  KeyRoundIcon,
  LucideIcon,
  ShoppingCart,
  UserIcon,
  VanIcon
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
    name: 'Address',
    href: ROUTES.ADDRESS,
    icon: VanIcon
  },
  {
    name: 'Password',
    href: ROUTES.PASSWORD,
    icon: KeyRoundIcon
  },
  {
    name: 'Account Detail',
    href: ROUTES.ACCOUNT_DETAIL,
    icon: UserIcon
  }
]

export const ProfileNavigation = () => {
  const pathname = usePathname()

  return (
    <ul className='space-y-4 mt-15'>
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
