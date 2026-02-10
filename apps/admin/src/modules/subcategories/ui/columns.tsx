import type { ColumnDef } from '@tanstack/react-table'
import type { Subcategory } from '../types/column.types'
import { Actions } from './Actions'

export const columns: ColumnDef<Subcategory>[] = [
	{
		accessorKey: 'name',
		header: 'Категория'
	},
	{
		accessorKey: 'slug',
		header: 'Slug'
	},
	{
		accessorKey: 'productsCount',
		header: 'Товаров'
	},
	{
		accessorKey: 'isActive',
		header: 'Статус',
		cell: ({ getValue }) => (getValue() ? 'Активна' : 'Не активна')
	},
	{
		accessorKey: 'actions',
		header: 'Действия',
		cell: Actions
	}
]
