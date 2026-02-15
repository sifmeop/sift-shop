import { Link } from '@tanstack/react-router'
import type { CellContext } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Subcategory } from '../../types/subcategory.types'

type ProductsCountCellProps = CellContext<Subcategory, unknown>

export const ProductsCountCell = ({ cell, row }: ProductsCountCellProps) => {
	const count = cell.getValue<Subcategory['productsCount']>()
	const { slug } = row.original
	return (
		<Link to='/products' params={{ slug }} className='flex items-center gap-2'>
			<span>{count}</span>
			<LinkIcon size={18} strokeWidth={2.5} />
		</Link>
	)
}
