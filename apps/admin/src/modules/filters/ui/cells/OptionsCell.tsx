import type { CellContext } from '@tanstack/react-table'
import type { Filter, FilterOption } from '../../types/filters.types'

type OptionsCellProps = CellContext<Filter, unknown>

export const OptionsCell = ({ cell }: OptionsCellProps) => {
	const options = cell.getValue<FilterOption[]>()

	if (options.length === 0) return '-'

	return <div>{options.map((o) => o.label).join(', ')}</div>
}
