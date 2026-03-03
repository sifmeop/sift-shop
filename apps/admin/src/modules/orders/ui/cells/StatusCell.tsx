import type { CellContext } from '@tanstack/react-table'
import { Badge } from '~/common/ui/Badge'
import type { Order } from '../../types/order.types'

type StatusCellProps = CellContext<Order, unknown>

const STATUS_VARIANT: Record<Order['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
	PENDING: 'secondary',
	PAID: 'default',
	PROCESSING: 'outline',
	CANCELLED: 'destructive'
}

export const StatusCell = ({ getValue }: StatusCellProps) => {
	const status = getValue<Order['status']>()

	return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
}

