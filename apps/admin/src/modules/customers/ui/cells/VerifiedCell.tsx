import type { CellContext } from '@tanstack/react-table'
import { Badge } from '~/common/ui/Badge'
import type { Customer } from '../../types/customer.types'

type VerifiedCellProps = CellContext<Customer, unknown>

export const VerifiedCell = ({ getValue }: VerifiedCellProps) => {
	const value = getValue<boolean>()

	return (
		<Badge variant={value ? 'default' : 'secondary'}>
			{value ? 'Verified' : 'Unverified'}
		</Badge>
	)
}

