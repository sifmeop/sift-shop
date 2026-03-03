import type { Product } from '~/modules/products'
import { ReviewsProductSelect } from './ReviewsProductSelect'
import { ReviewsSearch } from './ReviewsSearch'

interface ReviewsHeaderProps {
	products: Product[]
	selectedProductId: string | null
	onProductChange: (productId: string) => void
	searchValue: string
	onSearchChange: (value: string) => void
	isProductsLoading: boolean
}

export const ReviewsHeader = ({
	products,
	selectedProductId,
	onProductChange,
	searchValue,
	onSearchChange,
	isProductsLoading
}: ReviewsHeaderProps) => {
	return (
		<div className='flex justify-between items-center gap-2 mb-6'>
			<h3 className='font-semibold text-lg'>Reviews</h3>
			<div className='flex items-center gap-2'>
				<ReviewsProductSelect
					products={products}
					value={selectedProductId}
					onChange={onProductChange}
					disabled={isProductsLoading || products.length === 0}
				/>
				<ReviewsSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}

