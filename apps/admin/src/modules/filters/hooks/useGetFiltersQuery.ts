import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Filter } from '../types/filters.types'

const getFilters = async (slug: string) => {
	const { data } = await api.get<Filter[]>(`/filters/${slug}`)
	return data
}

export const useGetFiltersQuery = (slug: string) => {
	return useQuery({
		queryKey: QUERIES.GET_FILTERS(slug),
		queryFn: () => getFilters(slug)
	})
}
