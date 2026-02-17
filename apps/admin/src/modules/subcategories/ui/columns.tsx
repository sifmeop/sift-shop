import type { ColumnDef } from '@tanstack/react-table'
import type { Subcategory } from '../types/subcategory.types'
import { Actions } from './Actions'
import { FiltersCell } from './cells/FiltersCell'
import { ImageCell } from './cells/ImageCell'
import { ProductsCountCell } from './cells/ProductsCountCell'
import { UpdateStatus } from './cells/UpdateStatus'

export const columns: ColumnDef<Subcategory>[] = [
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
		accessorKey: 'image',
		header: 'Image',
		cell: ImageCell
	},
	{
		accessorKey: 'productsCount',
		header: 'Products count',
		cell: ProductsCountCell
	},
	{
		accessorKey: 'filtersCount',
		header: 'Filters',
		cell: FiltersCell
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end'>Actions</p>,
		cell: Actions
	}
]
