import type { CellContext } from '@tanstack/react-table'
import { Badge } from '~/common/ui/Badge'
import type { Order } from '../../types/order.types'

type MethodCellProps = CellContext<Order, unknown>

export const MethodCell = ({ getValue }: MethodCellProps) => {
	const method = getValue<Order['method']>()

	return <Badge variant='outline'>{method}</Badge>
}

