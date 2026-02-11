import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Category } from '../types/category.types'
import { Actions } from './Actions'
import { ActionsHeader } from './headers/ActionsHeader'
import { NameHeader } from './headers/NameHeader'
import { ProductsCountHeader } from './headers/ProductsCountHeader'
import { SubcategoriesCountHeader } from './headers/SubcategoriesCountHeader'

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: NameHeader
	},
	{
		accessorKey: 'slug',
		header: 'Slug'
	},
	{
		accessorKey: 'subcategoriesCount',
		header: SubcategoriesCountHeader,
		cell: ({ getValue, row }) => {
			const count = getValue() as number
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
	},
	{
		accessorKey: 'productsCount',
		header: ProductsCountHeader
	},
	{
		accessorKey: 'actions',
		header: ActionsHeader,
		cell: Actions
	}
]
