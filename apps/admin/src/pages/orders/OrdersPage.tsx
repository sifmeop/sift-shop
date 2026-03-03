import { useState } from 'react'
import { OrdersHeader, OrdersTable } from '~/modules/orders'
import type { OrderStatus } from '~/modules/orders/types/order.types'

export const OrdersPage = () => {
	const [searchValue, setSearchValue] = useState('')
	const [status, setStatus] = useState<'ALL' | OrderStatus>('ALL')

	return (
		<>
			<OrdersHeader
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				status={status}
				onStatusChange={setStatus}
			/>
			<OrdersTable searchValue={searchValue} status={status} />
		</>
	)
}

