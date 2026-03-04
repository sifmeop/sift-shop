import { ROUTES } from '~/common/constants/routes'
import { PageHeader } from '~/common/ui/PageHeader'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <PageHeader
        title='Checkout'
        breadcrumbs={[
          { label: 'Cart', href: ROUTES.CART },
          { label: 'Checkout' }
        ]}
      />
      {children}
    </>
  )
}
