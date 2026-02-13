import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const getSubcategories = async (slug: string) => {
	const { data } = await api.get<Subcategory[]>(`/subcategories/${slug}`)
	return data
}

export const useGetSubcategoriesQuery = (slug: string) => {
	return useQuery({
		queryKey: QUERIES.GET_SUBCATEGORIES(slug),
		queryFn: () => getSubcategories(slug)
	})
}
