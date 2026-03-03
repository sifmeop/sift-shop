import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import type { OrderStatus } from '../types/order.types'

const STATUS_OPTIONS: Array<{ label: string; value: 'ALL' | OrderStatus }> = [
	{ label: 'All statuses', value: 'ALL' },
	{ label: 'Pending', value: 'PENDING' },
	{ label: 'Paid', value: 'PAID' },
	{ label: 'Processing', value: 'PROCESSING' },
	{ label: 'Cancelled', value: 'CANCELLED' }
]

interface OrdersStatusFilterProps {
	value: 'ALL' | OrderStatus
	onChange: (value: 'ALL' | OrderStatus) => void
}

export const OrdersStatusFilter = ({ value, onChange }: OrdersStatusFilterProps) => {
	return (
		<Select value={value} onValueChange={(next) => onChange(next as 'ALL' | OrderStatus)}>
			<SelectTrigger className='min-w-[180px]'>
				<SelectValue placeholder='Status' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{STATUS_OPTIONS.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

