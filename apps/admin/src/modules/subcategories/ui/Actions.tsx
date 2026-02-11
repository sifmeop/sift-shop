import type { CellContext } from '@tanstack/react-table'
import type { Subcategory } from '../types/subcategory.types'
import { DeleteSubcategory } from './actions/DeleteSubcategory'
import { UpdateSubcategory } from './actions/UpdateSubcategory'

type ActionsProps = CellContext<Subcategory, unknown>

export const Actions = ({ row }: ActionsProps) => {
	return (
		<div className='flex gap-2 justify-end'>
			<UpdateSubcategory values={row.original} />
			<DeleteSubcategory id={row.original.id} name={row.original.name} />
		</div>
	)
}
