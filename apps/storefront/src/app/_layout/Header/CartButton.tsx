import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

import { CART_BUTTON_ID } from '~/common/constants/ids'
import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'

export const CartButton = () => {
  return (
    <Button id={CART_BUTTON_ID} variant='ghost' className='size-11.25'>
      <Link href={ROUTES.CART} className='inline-flex'>
        <ShoppingCartIcon className='size-6.5' strokeWidth={1.5} />
      </Link>
    </Button>
  )
}
