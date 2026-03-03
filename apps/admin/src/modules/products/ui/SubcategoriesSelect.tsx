import type { ProductSubcategory } from '../types/product.types'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'

interface SubcategoriesSelectProps {
	items: ProductSubcategory[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
}

export const SubcategoriesSelect = ({
	items,
	value,
	onChange,
	placeholder = 'Select subcategory',
	disabled = false
}: SubcategoriesSelectProps) => {
	return (
		<Select value={value} onValueChange={onChange} disabled={disabled}>
			<SelectTrigger className='min-w-[220px]'>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='all'>All subcategories</SelectItem>
					{items.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

