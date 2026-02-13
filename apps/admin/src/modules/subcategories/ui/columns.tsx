import type { ColumnDef } from '@tanstack/react-table'
import type { Subcategory } from '../types/subcategory.types'
import { Actions } from './Actions'
import { ImageCell } from './cells/ImageCell'
import { ProductsCountCell } from './cells/ProductsCountCell'
import { ActionsHeader } from './headers/ActionsHeader'
import { NameHeader } from './headers/NameHeader'
import { ProductsCountHeader } from './headers/ProductsCountHeader'

export const columns: ColumnDef<Subcategory>[] = [
	{
		accessorKey: 'name',
		header: NameHeader
	},
	{
		accessorKey: 'slug',
		header: 'Slug'
	},
	{
		accessorKey: 'image',
		header: 'Image',
		cell: ImageCell
	},
	{
		accessorKey: 'productsCount',
		header: ProductsCountHeader,
		cell: ProductsCountCell
	},
	{
		accessorKey: 'actions',
		header: ActionsHeader,
		cell: Actions
	}
]
