import type { ColumnDef } from '@tanstack/react-table'
import type { Product } from '../types/product.types'
import { ActionsCell } from './cells/ActionsCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { FilterValuesCell } from './cells/FilterValuesCell'
import { ImagesCell } from './cells/ImagesCell'
import { InStockSell } from './cells/InStockSell'
import { NameCell } from './cells/NameCell'
import { PriceCell } from './cells/PriceCell'
import { SlugCell } from './cells/SlugCell'
import { SpecificationsCell } from './cells/SpecificationsCell'
import { ThumbnailCell } from './cells/ThumbnailCell'

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: NameCell
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: DescriptionCell
	},
	{
		accessorKey: 'slug',
		header: 'Slug',
		cell: SlugCell
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: PriceCell
	},
	{
		accessorKey: 'inStock',
		header: 'In stock',
		cell: InStockSell
	},
	{
		accessorKey: 'thumbnail',
		header: 'Thumbnail',
		cell: ThumbnailCell
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: ImagesCell
	},
	{
		accessorKey: 'filterValues',
		header: 'Filter values',
		cell: FilterValuesCell
	},
	{
		accessorKey: 'specifications',
		header: 'Specifications',
		cell: SpecificationsCell
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ActionsCell
	}
]
