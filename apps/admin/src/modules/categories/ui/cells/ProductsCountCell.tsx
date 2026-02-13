import { Link } from '@tanstack/react-router'
import type { CellContext } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Category } from '../../types/category.types'

type ProductsCountCellProps = CellContext<Category, unknown>

export const ProductsCountCell = ({ cell }: ProductsCountCellProps) => {
	const count = cell.getValue() as number

	return (
		<div className='flex items-center gap-2'>
			<span>{count}</span>
			<Link to='/products'>
				<LinkIcon size={18} strokeWidth={2.5} />
			</Link>
		</div>
	)
}
