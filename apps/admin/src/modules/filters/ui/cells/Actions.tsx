import type { CellContext } from '@tanstack/react-table'
import { cn } from '~/common/utils/cn'
import type { Filter } from '../../types/filters.types'
import { DeleteFilter } from '../actions/DeleteFilter'
import { UpdateFilter } from '../actions/UpdateFilter'

type ActionsProps = CellContext<Filter, unknown>

export const Actions = ({ row }: ActionsProps) => {
	return (
		<div
			className={cn('flex gap-2 justify-end', {
				'opacity-50 pointer-events-none': row.original.slug === 'price'
			})}>
			<UpdateFilter values={row.original} />
			<DeleteFilter id={row.original.id} name={row.original.name} />
		</div>
	)
}
