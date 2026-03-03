import type { Category } from '~/modules/categories'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'

interface CategorySelectProps {
	categories: Category[]
	value: string
	onChange: (value: string) => void
	disabled?: boolean
}

export const CategorySelect = ({
	categories,
	value,
	onChange,
	disabled = false
}: CategorySelectProps) => {
	return (
		<Select value={value} onValueChange={onChange} disabled={disabled}>
			<SelectTrigger className='min-w-[220px]'>
				<SelectValue placeholder='Select category' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{categories.map((category) => (
						<SelectItem key={category.id} value={category.slug}>
							{category.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

