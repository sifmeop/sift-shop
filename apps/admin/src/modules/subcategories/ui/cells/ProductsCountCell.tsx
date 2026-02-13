import { Link } from '@tanstack/react-router'
import type { CellContext } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Subcategory } from '../../types/subcategory.types'

type ProductsCountCellProps = CellContext<Subcategory, unknown>

export const ProductsCountCell = ({ cell, row }: ProductsCountCellProps) => {
	const count = cell.getValue() as number
	const { slug } = row.original
	return (
		<div className='flex items-center gap-2'>
			<span>{count}</span>
			<Link to='/products' params={{ slug }}>
				<LinkIcon size={18} strokeWidth={2.5} />
			</Link>
		</div>
	)
}
