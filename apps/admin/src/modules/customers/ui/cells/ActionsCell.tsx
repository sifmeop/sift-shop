import type { CellContext } from '@tanstack/react-table'
import type { Customer } from '../../types/customer.types'
import { DeleteCustomer } from '../actions/DeleteCustomer'

type ActionsCellProps = CellContext<Customer, unknown>

export const ActionsCell = ({ row }: ActionsCellProps) => {
	return (
		<div className='flex justify-end'>
			<DeleteCustomer id={row.original.id} fullName={row.original.fullName} />
		</div>
	)
}

