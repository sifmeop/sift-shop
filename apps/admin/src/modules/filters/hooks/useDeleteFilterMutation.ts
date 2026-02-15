import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/filters/$slug'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Filter } from '../types/filters.types'

const deleteFilter = async (id: string) => {
	const { data } = await api.delete<Filter[]>(`/filters/${id}`)
	return data
}

export const useDeleteFilterMutation = (id: string) => {
	const { slug } = Route.useParams()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_FILTER(id),
		mutationFn: () => deleteFilter(id),
		onSuccess: (data) => {
			const prevFilters = queryClient.getQueryData<Filter[]>(
				QUERIES.GET_FILTERS(slug)
			)

			if (!prevFilters) return

			let updatedFilters = prevFilters.filter((filter) => filter.id !== id)

			updatedFilters = updatedFilters.map((filter) => {
				const upPosition = data.find((d) => d.id === filter.id)
				if (!upPosition) return filter

				return { ...filter, position: upPosition.position }
			})

			queryClient.setQueryData(QUERIES.GET_FILTERS(slug), updatedFilters)
		}
	})
}
