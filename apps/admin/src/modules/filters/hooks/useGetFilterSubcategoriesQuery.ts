import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { FilterSubcategory } from '../types/filters.types'

interface CategoryItem {
	slug: string
}

const getFilterSubcategories = async (): Promise<FilterSubcategory[]> => {
	const { data: categories } = await api.get<CategoryItem[]>('/categories')

	const responses = await Promise.all(
		categories.map(async (category) => {
			const { data } = await api.get<FilterSubcategory[]>(
				`/subcategories/${category.slug}`
			)
			return data
		})
	)

	return responses.flat().map((row) => ({
		id: row.id,
		name: row.name,
		slug: row.slug
	}))
}

export const useGetFilterSubcategoriesQuery = () => {
	return useQuery({
		queryKey: ['get-filter-subcategories'],
		queryFn: getFilterSubcategories
	})
}

