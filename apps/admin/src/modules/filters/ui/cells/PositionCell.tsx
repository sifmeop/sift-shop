import type { CellContext } from '@tanstack/react-table'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import { capitalizeFirstStrict } from '~/common/utils/capitalize'
import { useUpdatePositionMutation } from '../../hooks/useUpdatePositionMutation'
import { type Filter } from '../../types/filters.types'

type PositionCellProps = CellContext<Filter, unknown>

export const PositionCell = ({ cell, table }: PositionCellProps) => {
	const { mutateAsync } = useUpdatePositionMutation()

	const data = table.options.data
	const cellValue = cell.getValue<Filter['position']>()
	const maxPosition = Math.max(...data.map(({ position }) => position))
	const positions = Array.from({ length: maxPosition }, (_, i) => String(i + 1))

	const handleChange = async (value: string) => {
		try {
			await mutateAsync({
				old: cellValue,
				new: Number(value)
			})
		} catch (error) {
			toast.error(handleApiError(error))
		}
	}

	return (
		<Select
			value={String(cellValue)}
			onValueChange={handleChange}
			disabled={positions.length === 1}>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{positions.map((position) => (
						<SelectItem key={position} value={position}>
							{capitalizeFirstStrict(position)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
