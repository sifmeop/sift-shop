import type { CellContext } from '@tanstack/react-table'
import type { Customer } from '../../types/customer.types'

type CreatedAtCellProps = CellContext<Customer, unknown>

export const CreatedAtCell = ({ getValue }: CreatedAtCellProps) => {
	const date = getValue<string>()
	const normalizedDate = new Date(date)

	if (Number.isNaN(normalizedDate.getTime())) {
		return <div>-</div>
	}

	return (
		<div>
			{normalizedDate.toLocaleDateString()} {normalizedDate.toLocaleTimeString()}
		</div>
	)
}

