'use client'

import {
  CircleUserRound,
  HeartIcon,
  KeyRoundIcon,
  LogOutIcon,
  ShoppingCartIcon,
  UserIcon,
  VanIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Route, ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/common/ui/dropdown-menu'

export const UserMenu = () => {
  const router = useRouter()

  const handleRoute = (route: Route) => () => {
    router.push(route)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='size-11.25'>
          <CircleUserRound className='size-6.5' strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleRoute(ROUTES.ORDERS)}>
            <ShoppingCartIcon />
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRoute(ROUTES.WISHLIST)}>
            <HeartIcon />
            Wishlist
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRoute(ROUTES.ADDRESS)}>
            <VanIcon />
            Address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRoute(ROUTES.PASSWORD)}>
            <KeyRoundIcon />
            Password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRoute(ROUTES.ACCOUNT_DETAIL)}>
            <UserIcon />
            Account Details
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
