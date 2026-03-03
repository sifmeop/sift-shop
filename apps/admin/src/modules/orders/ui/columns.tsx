import type { ColumnDef } from '@tanstack/react-table'
import type { Order } from '../types/order.types'
import { ActionsCell } from './cells/ActionsCell'
import { CreatedAtCell } from './cells/CreatedAtCell'
import { CustomerCell } from './cells/CustomerCell'
import { MethodCell } from './cells/MethodCell'
import { StatusCell } from './cells/StatusCell'
import { TotalAmountCell } from './cells/TotalAmountCell'

export const columns: ColumnDef<Order>[] = [
	{
		accessorKey: 'number',
		header: 'Order #'
	},
	{
		accessorKey: 'customer',
		header: 'Customer',
		enableSorting: false,
		cell: CustomerCell
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: StatusCell
	},
	{
		accessorKey: 'method',
		header: 'Method',
		cell: MethodCell
	},
	{
		accessorKey: 'totalAmount',
		header: 'Total',
		cell: TotalAmountCell
	},
	{
		accessorKey: 'createdAt',
		header: 'Created at',
		cell: CreatedAtCell
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end w-full'>Actions</p>,
		enableSorting: false,
		cell: ActionsCell
	}
]
