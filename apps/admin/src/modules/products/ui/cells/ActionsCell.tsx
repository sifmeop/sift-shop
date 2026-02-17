import type { CellContext } from '@tanstack/react-table'
import type { Product } from '../../types/product.types'
import { DeleteProduct } from '../actions/DeleteProduct'
import { UpdateProduct } from '../actions/UpdateProduct'

type ActionsProps = CellContext<Product, unknown>

export const ActionsCell = ({ row }: ActionsProps) => {
	return (
		<div className='flex gap-2 justify-end'>
			<UpdateProduct />
			<DeleteProduct id={row.original.id} name={row.original.name} />
		</div>
	)
}
