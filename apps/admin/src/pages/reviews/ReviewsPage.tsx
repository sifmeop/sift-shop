import { useMemo, useState } from 'react'
import { useGetProductsQuery } from '~/modules/products/hooks/useGetProductsQuery'
import { ReviewsHeader, ReviewsTable } from '~/modules/reviews'

export const ReviewsPage = () => {
	const { data: products = [], isLoading: isProductsLoading } =
		useGetProductsQuery()
	const [searchValue, setSearchValue] = useState('')
	const [selectedProductId, setSelectedProductId] = useState<string | null>(
		'all'
	)

	const effectiveProductId = useMemo(() => {
		if (selectedProductId) {
			return selectedProductId
		}

		return products[0]?.id ?? null
	}, [selectedProductId, products])

	return (
		<>
			<ReviewsHeader
				products={products}
				selectedProductId={effectiveProductId}
				onProductChange={setSelectedProductId}
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				isProductsLoading={isProductsLoading}
			/>
			<ReviewsTable
				productId={effectiveProductId === 'all' ? null : effectiveProductId}
				searchValue={searchValue}
			/>
		</>
	)
}
