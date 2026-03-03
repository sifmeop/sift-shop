import type { CellContext } from '@tanstack/react-table'
import type { Customer } from '../../types/customer.types'

type PhoneCellProps = CellContext<Customer, unknown>

export const PhoneCell = ({ row }: PhoneCellProps) => {
	return <div>{row.original.accountDetails?.phone ?? '-'}</div>
}

