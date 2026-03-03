import type { CellContext } from '@tanstack/react-table'
import type { Review } from '../../types/review.types'
import { DeleteReview } from '../actions/DeleteReview'

type ActionsCellProps = CellContext<Review, unknown>

export const createActionsCell = (productId: string) => {
	const ActionsCell = ({ row }: ActionsCellProps) => {
		return (
			<div className='flex justify-end'>
				<DeleteReview
					id={row.original.id}
					productId={productId}
					fullName={row.original.fullName}
				/>
			</div>
		)
	}

	return ActionsCell
}

