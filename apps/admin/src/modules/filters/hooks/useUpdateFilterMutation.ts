import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { Filter, FilterBody } from '../types/filters.types'

const updateFilter = async (id: string, body: FilterBody) => {
	const { data } = await api.put<Filter>(`/filters/${id}`, body)
	return data
}

export const useUpdateFilterMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['update-filter', id],
		mutationFn: (body: FilterBody) => updateFilter(id, body),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-filters-page']
			})
		}
	})
}

