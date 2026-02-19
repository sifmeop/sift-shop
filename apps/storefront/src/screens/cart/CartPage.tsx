import { PageHeader } from '~/common/ui/page-header'
import { Cart } from '~/modules/cart'

export const CartPage = () => {
  return (
    <>
      <PageHeader title='Cart' breadcrumbs={[{ label: 'Cart' }]} />
      <Cart />
    </>
  )
}
