import type { CellContext } from '@tanstack/react-table'
import { formatPrice } from '~/common/utils/formatPrice'
import type { Order } from '../../types/order.types'

type TotalAmountCellProps = CellContext<Order, unknown>

export const TotalAmountCell = ({ getValue }: TotalAmountCellProps) => {
	const amount = getValue<string>()

	return <div>{formatPrice(amount)}</div>
}
