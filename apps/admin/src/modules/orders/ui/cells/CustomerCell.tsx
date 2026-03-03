import type { CellContext } from '@tanstack/react-table'
import type { Order } from '../../types/order.types'

type CustomerCellProps = CellContext<Order, unknown>

export const CustomerCell = ({ row }: CustomerCellProps) => {
	const fullName = `${row.original.firstName} ${row.original.lastName}`

	return (
		<div className='max-w-56 truncate' title={`${fullName} (${row.original.email})`}>
			{fullName}
		</div>
	)
}

