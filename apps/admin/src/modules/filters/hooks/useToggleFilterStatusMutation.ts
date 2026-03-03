import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { Filter } from '../types/filters.types'

const toggleFilterStatus = async (id: string) => {
	const { data } = await api.patch<Filter>(`/filters/${id}/status`)
	return data
}

export const useToggleFilterStatusMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['toggle-filter-status', id],
		mutationFn: () => toggleFilterStatus(id),
		onSuccess: (updated) => {
			const caches = queryClient.getQueriesData<Filter[]>({
				queryKey: ['get-filters-page']
			})

			for (const [key, rows] of caches) {
				queryClient.setQueryData<Filter[]>(
					key,
					(rows ?? []).map((row) => (row.id === updated.id ? updated : row))
				)
			}
		}
	})
}

