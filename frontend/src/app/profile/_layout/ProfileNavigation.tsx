import { ROUTES } from '~/common/constants/routes'

import { ProfileMenuItem } from './ProfileMenuItem'

const links = [
  {
    name: 'Orders',
    href: ROUTES.ORDERS,
    icon: '/assets/icons/profile/orders.svg'
  },
  {
    name: 'Wishlist',
    href: ROUTES.WISHLIST,
    icon: '/assets/icons/profile/wishlist.svg'
  },
  {
    name: 'Address',
    href: ROUTES.ADDRESS,
    icon: '/assets/icons/profile/address.svg'
  },
  {
    name: 'Password',
    href: ROUTES.PASSWORD,
    icon: '/assets/icons/profile/password.svg'
  },
  {
    name: 'Account Detail',
    href: ROUTES.ACCOUNT_DETAIL,
    icon: '/assets/icons/profile/account-detail.svg'
  }
]

export const ProfileNavigation = () => {
  return (
    <ul className='space-y-4'>
      {links.map((link) => (
        <ProfileMenuItem key={link.href} {...link} />
      ))}
    </ul>
  )
}
