import { Link } from '@tanstack/react-router'
import type { CellContext } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Category } from '../../types/category.types'

type ProductsCountCellProps = CellContext<Category, unknown>

export const ProductsCountCell = ({ cell }: ProductsCountCellProps) => {
	const count = cell.getValue<Category['productsCount']>()

	return (
		<Link to='/products' className='flex items-center gap-2'>
			<span>{count}</span>
			<LinkIcon size={18} strokeWidth={2.5} />
		</Link>
	)
}
