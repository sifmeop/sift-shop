'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { Container } from '~/common/ui/container'
import { PageHeader } from '~/common/ui/page-header'
import { Separator } from '~/common/ui/separator'

import { ProfileNavigation } from './ProfileNavigation'

const titles = {
  [ROUTES.ORDERS]: 'Orders',
  [ROUTES.WISHLIST]: 'Wishlist',
  [ROUTES.ADDRESS]: 'Address',
  [ROUTES.PASSWORD]: 'Password',
  [ROUTES.ACCOUNT_DETAIL]: 'Account Detail'
}

export const ProfileLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()

  const title = titles[pathname as keyof typeof titles] ?? 'Profile'

  return (
    <>
      <PageHeader title='My Account' breadcrumbs={[{ label: 'My Account' }]} />
      <Container main bgColor='white' className='pt-15 pb-32.5'>
        <div className='flex items-start'>
          <div className='sticky top-4 flex'>
            <ProfileNavigation />
            <Separator
              orientation='vertical'
              className='shrink-0 h-112 ml-9 mr-12'
            />
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold text-base mb-14'>{title}</h3>
            {children}
          </div>
        </div>
      </Container>
    </>
  )
}
