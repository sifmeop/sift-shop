import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const getSubcategories = async (categoryId: string) => {
	const { data } = await api.get<Subcategory[]>(`/subcategories/${categoryId}`)
	return data
}

export const useGetSubcategoriesQuery = (categoryId: string) => {
	return useQuery({
		queryKey: QUERIES.GET_SUBCATEGORIES(categoryId),
		queryFn: () => getSubcategories(categoryId)
	})
}
