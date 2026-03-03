import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import type { FilterSubcategory } from '../types/filters.types'

interface FilterSubcategorySelectProps {
	items: FilterSubcategory[]
	value: string
	onChange: (value: string) => void
	disabled?: boolean
}

export const FilterSubcategorySelect = ({
	items,
	value,
	onChange,
	disabled = false
}: FilterSubcategorySelectProps) => {
	return (
		<Select value={value} onValueChange={onChange} disabled={disabled}>
			<SelectTrigger className='min-w-[220px]'>
				<SelectValue placeholder='Select subcategory' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='all'>All filters</SelectItem>
					{items.map((item) => (
						<SelectItem key={item.id} value={item.slug}>
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

