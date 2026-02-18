import type { ColumnDef } from '@tanstack/react-table'
import type { Filter } from '../types/filters.types'
import { Actions } from './cells/Actions'
import { OptionsCell } from './cells/OptionsCell'
import { PositionCell } from './cells/PositionCell'
import { UpdateStatus } from './cells/UpdateStatus'

export const columns: ColumnDef<Filter>[] = [
	{
		accessorKey: 'position',
		header: 'Position',
		cell: PositionCell
	},
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'isActive',
		header: 'Status',
		cell: UpdateStatus
	},
	{
		accessorKey: 'options',
		header: 'Options',
		cell: OptionsCell
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end'>Actions</p>,
		cell: Actions
	}
]
