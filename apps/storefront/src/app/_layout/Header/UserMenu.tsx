'use client'

import {
  CircleUserRound,
  HeartIcon,
  KeyRoundIcon,
  LogOutIcon,
  ShoppingCartIcon,
  UserIcon,
  UserPlusIcon,
  VanIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useSignOutMutation } from '~/app/auth/sign-out'
import { Route, ROUTES } from '~/common/constants/routes'
import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
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
  const isAuthenticated = useIsAuthenticated()
  const [mutate] = useSignOutMutation()

  const handleRoute = (route: Route) => () => {
    router.push(route)
  }

  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-11.25'>
            <CircleUserRound className='size-6.5' strokeWidth={1.5} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleRoute(ROUTES.SIGN_IN)}>
              <UserIcon />
              Sign In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRoute(ROUTES.SIGN_UP)}>
              <UserPlusIcon />
              Sign Up
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
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
          <DropdownMenuLabel>Account</DropdownMenuLabel>
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
        <DropdownMenuItem variant='destructive' onClick={() => mutate()}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
