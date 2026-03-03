import { useMemo, useState } from 'react'
import { handleApiError } from '~/common/api/errorHandler'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { useGetAllSubcategoriesQuery } from '../hooks/useGetAllSubcategoriesQuery'
import { useGetProductsQuery } from '../hooks/useGetProductsQuery'
import { useGetProductSubcategoriesQuery } from '../hooks/useGetProductSubcategoriesQuery'
import { ProductsHeader } from './ProductsHeader'
import { ProductsTable } from './ProductsTable'

export const ProductsScreen = () => {
	const [searchValue, setSearchValue] = useState('')
	const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('all')
	const {
		data: products = [],
		isLoading: isProductsLoading,
		isError: isProductsError,
		error: productsError
	} = useGetProductsQuery()
	const {
		data: subcategories = [],
		isLoading: isSubcategoriesLoading,
		isError: isSubcategoriesError,
		error: subcategoriesError
	} = useGetProductSubcategoriesQuery()
	const {
		data: allSubcategories = [],
		isLoading: isAllSubcategoriesLoading,
		isError: isAllSubcategoriesError,
		error: allSubcategoriesError
	} = useGetAllSubcategoriesQuery()

	const subcategoriesWithProducts = useMemo(
		() => subcategories.filter((subcategory) => subcategory.productsCount > 0),
		[subcategories]
	)

	const normalizedSearch = searchValue.trim().toLowerCase()
	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			if (
				selectedSubcategoryId !== 'all' &&
				product.subcategoryId !== selectedSubcategoryId
			) {
				return false
			}

			if (!normalizedSearch) {
				return true
			}

			const searchableValues = [
				product.name,
				product.slug,
				product.description ?? ''
			].join(' ')

			return searchableValues.toLowerCase().includes(normalizedSearch)
		})
	}, [products, selectedSubcategoryId, normalizedSearch])

	if (isProductsLoading || isSubcategoriesLoading || isAllSubcategoriesLoading)
		return <CenterLoader />
	if (isProductsError) return <div>{handleApiError(productsError)}</div>
	if (isSubcategoriesError) return <div>{handleApiError(subcategoriesError)}</div>
	if (isAllSubcategoriesError) return <div>{handleApiError(allSubcategoriesError)}</div>

	return (
		<>
			<ProductsHeader
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				selectedSubcategoryId={selectedSubcategoryId}
				onSubcategoryChange={setSelectedSubcategoryId}
				subcategoriesWithProducts={subcategoriesWithProducts}
				allSubcategories={allSubcategories}
				isSubcategoriesLoading={isSubcategoriesLoading}
			/>
			<ProductsTable
				products={filteredProducts}
				subcategories={allSubcategories}
			/>
		</>
	)
}
