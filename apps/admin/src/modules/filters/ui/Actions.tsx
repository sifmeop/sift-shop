import type { CellContext } from '@tanstack/react-table'
import type { Filter } from '../types/filters.types'
import { DeleteFilter } from './actions/DeleteFilter'
import { UpdateFilter } from './actions/UpdateFilter'

type ActionsProps = CellContext<Filter, unknown>

export const Actions = ({ row }: ActionsProps) => {
	return (
		<div className='flex gap-2 justify-end'>
			<UpdateFilter values={row.original} />
			<DeleteFilter id={row.original.id} name={row.original.name} />
		</div>
	)
}
