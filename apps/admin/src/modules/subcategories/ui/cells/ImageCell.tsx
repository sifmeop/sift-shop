import type { CellContext } from '@tanstack/react-table'
import type { Subcategory } from '../../types/subcategory.types'

type ImageCellProps = CellContext<Subcategory, unknown>

// eslint-disable-next-line no-empty-pattern
export const ImageCell = ({}: ImageCellProps) => {
	return <div>-</div>
}
