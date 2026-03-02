import { HEADER_ID } from '~/common/constants/ids'
import { Container } from '~/common/ui/container'
import { Notifications } from '~/modules/notifications'
import { SearchBar } from '~/modules/search'

import { CartButton } from './CartButton'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { UserMenu } from './UserMenu'

export const Header = () => {
  return (
    <header id={HEADER_ID} className='bg-white'>
      <Container
        className='py-3'
        innerClassName='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-5'>
          <Logo />
          <Navigation />
        </div>
        <div className='flex items-center gap-3'>
          <SearchBar />
          <Notifications />
          <CartButton />
          <UserMenu />
        </div>
      </Container>
    </header>
  )
}
