import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { Filter } from '../types/filters.types'

const deleteFilter = async (id: string) => {
	const { data } = await api.delete<Filter>(`/filters/${id}`)
	return data
}

export const useDeleteFilterMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete-filter', id],
		mutationFn: () => deleteFilter(id),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['get-filters-page'] })
			const previous = queryClient.getQueriesData<Filter[]>({
				queryKey: ['get-filters-page']
			})

			for (const [key, value] of previous) {
				queryClient.setQueryData<Filter[]>(
					key,
					(value ?? []).filter((item) => item.id !== id)
				)
			}

			return { previous }
		},
		onError: (_err, _var, context) => {
			if (!context?.previous) return
			for (const [key, value] of context.previous) {
				queryClient.setQueryData(key, value)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['get-filters-page'] })
		}
	})
}

