import type { ColumnDef } from '@tanstack/react-table'
import type { Customer } from '../types/customer.types'
import { ActionsCell } from './cells/ActionsCell'
import { CreatedAtCell } from './cells/CreatedAtCell'
import { PhoneCell } from './cells/PhoneCell'
import { TwoFactorCell } from './cells/TwoFactorCell'
import { VerifiedCell } from './cells/VerifiedCell'

export const columns: ColumnDef<Customer>[] = [
	{
		accessorKey: 'fullName',
		header: 'Full name'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'isVerified',
		header: 'Status',
		cell: VerifiedCell
	},
	{
		accessorKey: 'isTwoFactorEnabled',
		header: '2FA',
		cell: TwoFactorCell
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableSorting: false,
		cell: PhoneCell
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
