import type { CellContext } from '@tanstack/react-table'
import type { Review } from '../../types/review.types'

type RatingCellProps = CellContext<Review, unknown>

export const RatingCell = ({ getValue }: RatingCellProps) => {
	const rating = getValue<number>()
	return <div>{rating}/5</div>
}

