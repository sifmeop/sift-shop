import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { ProductSubcategory } from '../types/product.types'

interface CategoryItem {
	slug: string
}

interface SubcategoryResponse {
	id: string
	name: string
	slug: string
	productsCount: number
}

const getAllSubcategories = async (): Promise<ProductSubcategory[]> => {
	const { data: categories } = await api.get<CategoryItem[]>('/categories')

	const subcategoriesByCategory = await Promise.all(
		categories.map(async (category) => {
			const { data } = await api.get<SubcategoryResponse[]>(
				`/subcategories/${category.slug}`
			)
			return data
		})
	)

	return subcategoriesByCategory.flat()
}

export const useGetAllSubcategoriesQuery = () => {
	return useQuery({
		queryKey: ['get-all-product-subcategories'],
		queryFn: getAllSubcategories
	})
}

