import type { ColumnDef } from '@tanstack/react-table'
import { capitalize } from '~/common/utils/capitalize'
import type { Filter } from '../types/filters.types'
import { Actions } from './Actions'
import { OptionsCell } from './cells/OptionsCell'
import { PositionCell } from './cells/PositionCell'

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
		accessorKey: 'type',
		header: 'Type',
		cell: (cell) => <span>{capitalize(cell.getValue<Filter['type']>())}</span>
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
