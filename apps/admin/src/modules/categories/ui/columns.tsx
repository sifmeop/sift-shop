import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { LinkIcon } from 'lucide-react'
import type { Category } from '../types/column.types'
import { Actions } from './Actions'

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: 'Категория'
	},
	{
		accessorKey: 'slug',
		header: 'Slug'
	},
	{
		accessorKey: 'subcategoriesCount',
		header: 'Подкатегорий',
		cell: ({ getValue, row }) => {
			const count = getValue() as number
			const categoryId = row.original.id
			return (
				<div className='flex items-center gap-2'>
					<span>{count}</span>
					<Link to={`/categories/${categoryId}`}>
						<LinkIcon size={18} strokeWidth={2.5} />
					</Link>
				</div>
			)
		}
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
