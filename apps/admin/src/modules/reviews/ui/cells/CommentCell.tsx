import type { CellContext } from '@tanstack/react-table'
import type { Review } from '../../types/review.types'

type CommentCellProps = CellContext<Review, unknown>

export const CommentCell = ({ getValue }: CommentCellProps) => {
	const comment = getValue<string | null>()
	const value = comment?.trim() ? comment : '-'

	return (
		<div className='truncate max-w-70' title={value}>
			{value}
		</div>
	)
}

