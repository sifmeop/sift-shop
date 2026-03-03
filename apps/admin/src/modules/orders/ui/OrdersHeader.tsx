import type { OrderStatus } from '../types/order.types'
import { OrdersSearch } from './OrdersSearch'
import { OrdersStatusFilter } from './OrdersStatusFilter'

interface OrdersHeaderProps {
	searchValue: string
	onSearchChange: (value: string) => void
	status: 'ALL' | OrderStatus
	onStatusChange: (value: 'ALL' | OrderStatus) => void
}

export const OrdersHeader = ({
	searchValue,
	onSearchChange,
	status,
	onStatusChange
}: OrdersHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Orders</h3>
			<div className='flex items-center gap-2'>
				<OrdersStatusFilter value={status} onChange={onStatusChange} />
				<OrdersSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}

