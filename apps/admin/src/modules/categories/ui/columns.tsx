import type { ColumnDef } from '@tanstack/react-table'
import type { Category } from '../types/category.types'
import { Actions } from './cells/Actions'
import { SubcategoriesCountCell } from './cells/SubcategoriesCountCell'
import { ActionsHeader } from './headers/ActionsHeader'
import { NameHeader } from './headers/NameHeader'
import { ProductsCountHeader } from './headers/ProductsCountHeader'
import { SubcategoriesCountHeader } from './headers/SubcategoriesCountHeader'

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: NameHeader,
		enableSorting: false
	},
	{
		accessorKey: 'slug',
		header: 'Slug',
		enableSorting: false
	},
	{
		accessorKey: 'subcategoriesCount',
		header: SubcategoriesCountHeader,
		cell: SubcategoriesCountCell,
		enableSorting: true
	},
	{
		accessorKey: 'productsCount',
		header: ProductsCountHeader,
		sortingFn: 'alphanumeric',
		enableSorting: true
	},
	{
		accessorKey: 'actions',
		header: ActionsHeader,
		cell: Actions,
		enableSorting: false
	}
]
