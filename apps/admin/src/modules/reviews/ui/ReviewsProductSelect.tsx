import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import type { Product } from '~/modules/products'

interface ReviewsProductSelectProps {
	products: Product[]
	value: string | null
	onChange: (value: string) => void
	disabled?: boolean
}

export const ReviewsProductSelect = ({
	products,
	value,
	onChange,
	disabled = false
}: ReviewsProductSelectProps) => {
	return (
		<Select value={value ?? ''} onValueChange={onChange} disabled={disabled}>
			<SelectTrigger className='min-w-[220px]'>
				<SelectValue placeholder='Select product' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='all'>All</SelectItem>
					{products.map((product) => (
						<SelectItem key={product.id} value={product.id}>
							{product.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
