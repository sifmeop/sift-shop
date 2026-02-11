import type { CellContext } from '@tanstack/react-table'
import type { Category } from '../types/category.types'
import { DeleteCategory } from './actions/DeleteCategory'
import { UpdateCategory } from './actions/UpdateCategory'

type ActionsProps = CellContext<Category, unknown>

export const Actions = ({ row }: ActionsProps) => {
	return (
		<div className='flex gap-2 justify-end'>
			<UpdateCategory values={row.original} />
			<DeleteCategory id={row.original.id} name={row.original.name} />
		</div>
	)
}
