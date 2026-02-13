import type { CellContext } from '@tanstack/react-table'
import { env } from '~/common/constants/env'
import { Gallery } from '~/common/ui/Gallery'
import type { Subcategory } from '../../types/subcategory.types'

type ImageCellProps = CellContext<Subcategory, unknown>

export const ImageCell = ({ cell }: ImageCellProps) => {
	const key = cell.getValue() as string

	const image = env.VITE_S3_BASE_URL + '/' + key

	return <Gallery images={image} className='max-w-25 aspect-video w-full' />
}
