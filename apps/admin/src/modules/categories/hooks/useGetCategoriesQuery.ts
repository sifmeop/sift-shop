import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '../categories/types/column.types'

const getCategories = async () => {
	const { data } = await api.get<Category[]>('/categories')
	return data
}

export const useGetCategoriesQuery = () => {
	return useQuery({
		queryKey: QUERIES.GET_CATEGORIES,
		queryFn: getCategories
	})
}
