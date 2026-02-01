import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='min-h-screen'>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
