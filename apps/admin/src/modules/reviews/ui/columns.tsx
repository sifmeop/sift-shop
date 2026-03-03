import type { ColumnDef } from '@tanstack/react-table'
import type { Review } from '../types/review.types'
import { createActionsCell } from './cells/ActionsCell'
import { CommentCell } from './cells/CommentCell'
import { CreatedAtCell } from './cells/CreatedAtCell'
import { RatingCell } from './cells/RatingCell'

export const createColumns = (productId: string): ColumnDef<Review>[] => [
	{
		accessorKey: 'fullName',
		header: 'Reviewer'
	},
	{
		accessorKey: 'rating',
		header: 'Rating',
		cell: RatingCell
	},
	{
		accessorKey: 'comment',
		header: 'Comment',
		cell: CommentCell
	},
	{
		accessorKey: 'userId',
		header: 'User ID'
	},
	{
		accessorKey: 'createdAt',
		header: 'Created at',
		cell: CreatedAtCell
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-end w-full'>Actions</p>,
		enableSorting: false,
		cell: createActionsCell(productId)
	}
]
