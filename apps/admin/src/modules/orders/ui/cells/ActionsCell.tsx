import type { CellContext } from '@tanstack/react-table'
import type { Order } from '../../types/order.types'
import { ViewOrder } from '../actions/ViewOrder'

type ActionsCellProps = CellContext<Order, unknown>

export const ActionsCell = ({ row }: ActionsCellProps) => {
	return (
		<div className='flex justify-end'>
			<ViewOrder order={row.original} />
		</div>
	)
}

