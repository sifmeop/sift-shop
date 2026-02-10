import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/column.types'

const getSubcategories = async (id: string) => {
	const { data } = await api.get<Subcategory[]>(`/categories/${id}`)
	return data
}

export const useGetSubcategoriesQuery = (id: string) => {
	return useQuery({
		queryKey: QUERIES.GET_SUBCATEGORIES(id),
		queryFn: () => getSubcategories(id)
	})
}
