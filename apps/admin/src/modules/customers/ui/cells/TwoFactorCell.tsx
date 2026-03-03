import type { CellContext } from '@tanstack/react-table'
import { Badge } from '~/common/ui/Badge'
import type { Customer } from '../../types/customer.types'

type TwoFactorCellProps = CellContext<Customer, unknown>

export const TwoFactorCell = ({ getValue }: TwoFactorCellProps) => {
	const value = getValue<boolean>()

	return <Badge variant={value ? 'default' : 'outline'}>{value ? 'On' : 'Off'}</Badge>
}

