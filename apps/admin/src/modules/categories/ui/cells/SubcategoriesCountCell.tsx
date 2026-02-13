import { Link } from '@tanstack/react-router'
import type { CellContext } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Category } from '../../types/category.types'

type SubcategoriesCountCellProps = CellContext<Category, unknown>

export const SubcategoriesCountCell = ({
	cell,
	row
}: SubcategoriesCountCellProps) => {
	const count = cell.getValue() as number
	const { id: categoryId } = row.original
	return (
		<div className='flex items-center gap-2'>
			<span>{count}</span>
			<Link
				to='/categories/$categoryId'
				params={{ categoryId }}
				search={{ redirect: window.location.pathname }}>
				<LinkIcon size={18} strokeWidth={2.5} />
			</Link>
		</div>
	)
}
