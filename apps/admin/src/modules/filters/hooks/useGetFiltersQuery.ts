import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { Filter } from '../types/filters.types'

const getFilters = async (subcategorySlug: string | null) => {
	const { data } = await api.get<Filter[]>('/filters', {
		params: subcategorySlug ? { subcategorySlug } : {}
	})
	return data
}

export const useGetFiltersQuery = (subcategorySlug: string | null) => {
	return useQuery({
		queryKey: ['get-filters-page', subcategorySlug ?? 'all'],
		queryFn: () => getFilters(subcategorySlug)
	})
}

