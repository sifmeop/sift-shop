import type { CellContext } from '@tanstack/react-table'
import type { Order } from '../../types/order.types'

type CreatedAtCellProps = CellContext<Order, unknown>

export const CreatedAtCell = ({ getValue }: CreatedAtCellProps) => {
	const raw = getValue<string>()
	const date = new Date(raw)

	if (Number.isNaN(date.getTime())) {
		return <div>-</div>
	}

	return (
		<div>
			{date.toLocaleDateString()} {date.toLocaleTimeString()}
		</div>
	)
}

