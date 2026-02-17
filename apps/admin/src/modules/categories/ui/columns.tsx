import type { ColumnDef } from '@tanstack/react-table'
import type { Category } from '../types/category.types'
import { Actions } from './cells/Actions'
import { ProductsCountCell } from './cells/ProductsCountCell'
import { SubcategoriesCountCell } from './cells/SubcategoriesCountCell'
import { UpdateStatus } from './cells/UpdateStatus'

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'slug',
		header: 'Slug'
	},
	{
		accessorKey: 'isActive',
		header: 'Status',
		cell: UpdateStatus
	},
	{
		accessorKey: 'subcategoriesCount',
		header: 'Subcategories count',
		cell: SubcategoriesCountCell
	},
	{
		accessorKey: 'productsCount',
		header: 'Products count',
		cell: ProductsCountCell
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end'>Actions</p>,
		cell: Actions
	}
]
