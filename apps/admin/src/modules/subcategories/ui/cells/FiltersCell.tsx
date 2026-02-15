import { Link } from '@tanstack/react-router'
import type { CellContext } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Subcategory } from '../../types/subcategory.types'

type FiltersCellProps = CellContext<Subcategory, unknown>

export const FiltersCell = ({ cell, row }: FiltersCellProps) => {
	const filtersCount = cell.getValue<Subcategory['filtersCount']>()

	return (
		<Link
			to='/filters/$slug'
			params={{
				slug: row.original.slug
			}}
			className='flex items-center gap-2'>
			<span>{filtersCount}</span>
			<LinkIcon size={18} strokeWidth={2.5} />
		</Link>
	)
}
