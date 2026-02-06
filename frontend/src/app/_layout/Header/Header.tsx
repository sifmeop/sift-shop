import { Container } from '~/common/ui/container'

import { CartButton } from './CartButton'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { SearchBar } from './SearchBar'
import { UserMenu } from './UserMenu'

export const Header = () => {
  return (
    <header className='bg-white'>
      <Container
        className='py-3'
        innerClassName='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-5'>
          <Logo />
          <Navigation />
        </div>
        <div className='flex items-center gap-5'>
          <SearchBar />
          <CartButton />
          <UserMenu />
        </div>
      </Container>
    </header>
  )
}
