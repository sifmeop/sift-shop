'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { Container } from '~/common/ui/Container'
import { PageHeader } from '~/common/ui/PageHeader'
import { Separator } from '~/common/ui/Separator'

import { ProfileNavigation } from './ProfileNavigation'

const titles = {
  [ROUTES.ORDERS]: 'Orders',
  [ROUTES.WISHLIST]: 'Wishlist',
  [ROUTES.ACCOUNT_DETAIL]: 'Account Details',
  [ROUTES.TWO_FACTOR_AUTH]: 'Two-Factor Authentication'
}

export const ProfileLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()

  const title = titles[pathname as keyof typeof titles] ?? 'Profile'

  return (
    <>
      <PageHeader title='My Account' breadcrumbs={[{ label: 'My Account' }]} />
      <Container
        main
        bgColor='white'
        className='pt-10 pb-16 md:pt-12 md:pb-24 lg:pt-15 lg:pb-32.5'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0'>
          <div className='lg:sticky lg:top-4 lg:flex'>
            <ProfileNavigation />
            <Separator
              orientation='vertical'
              className='mx-8 hidden h-112 shrink-0 lg:block'
            />
          </div>
          <div className='flex-1'>
            <h3 className='mb-6 text-base font-semibold md:mb-8 lg:mb-10'>
              {title}
            </h3>
            {children}
          </div>
        </div>
      </Container>
    </>
  )
}
