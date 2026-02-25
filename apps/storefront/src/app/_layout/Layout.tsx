import { FirstOrderBanner } from './FirstOrderBanner'
import { Footer } from './Footer'
import { Header } from './Header/Header'
import { Main } from './Main'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <FirstOrderBanner />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
