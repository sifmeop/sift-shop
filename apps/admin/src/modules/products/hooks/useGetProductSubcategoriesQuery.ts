import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { ProductSubcategory } from '../types/product.types'

const getAllSubcategories = async (): Promise<ProductSubcategory[]> => {
	const { data } = await api.get<ProductSubcategory[]>(
		'/subcategories/with-products'
	)
	return data
}

export const useGetProductSubcategoriesQuery = () => {
	return useQuery({
		queryKey: ['get-product-subcategories'],
		queryFn: getAllSubcategories
	})
}

export const PRODUCT_SUBCATEGORIES_QUERY_KEY = ['get-product-subcategories']
