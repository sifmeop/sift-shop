import type { ColumnDef } from '@tanstack/react-table'
import type { Category } from '../types/category.types'
import { Actions } from './cells/Actions'
import { ProductsCountCell } from './cells/ProductsCountCell'
import { SubcategoriesCountCell } from './cells/SubcategoriesCountCell'

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		enableSorting: false
	},
	{
		accessorKey: 'slug',
		header: 'Slug',
		enableSorting: false
	},
	{
		accessorKey: 'subcategoriesCount',
		header: 'Subcategories count',
		cell: SubcategoriesCountCell,
		enableSorting: true
	},
	{
		accessorKey: 'productsCount',
		header: 'Products count',
		cell: ProductsCountCell,
		enableSorting: true
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end'>Actions</p>,
		cell: Actions,
		enableSorting: false
	}
]
