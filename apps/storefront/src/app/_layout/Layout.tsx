import { Container } from '~/common/ui/Container'

import { Footer } from './Footer'
import { Header } from './Header/Header'
import { Main } from './Main'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Container bgColor='white' innerClassName='py-2 text-center'>
        <a
          href='https://github.com/sifmeop'
          target='_blank'
          rel='noopener noreferrer'
          className='text-muted-foreground hover:text-foreground transition-colors'>
          @sifmeop
        </a>
      </Container>
    </div>
  )
}
