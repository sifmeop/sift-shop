import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Route } from '~/app/routes/_auth/filters/$slug'
import { api } from '~/common/api/axiosInstance'
import { handleApiError } from '~/common/api/errorHandler'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Filter } from '../types/filters.types'

interface UpdateFilterStatusBody {
	isActive: boolean
}

const updateFilter = async (id: string, body: UpdateFilterStatusBody) => {
	const { data } = await api.patch<Filter>(`/filters/${id}/status`, body)
	return data
}

export const useUpdateFilterStatus = (id: string) => {
	const { slug } = Route.useParams()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_STATUS_FILTER(id),
		mutationFn: (body: UpdateFilterStatusBody) => updateFilter(id, body),
		onSuccess: (_, { isActive }) => {
			const prevFilters = queryClient.getQueryData<Filter[]>(
				QUERIES.GET_FILTERS(slug)
			)

			if (!prevFilters) return

			queryClient.setQueryData(
				QUERIES.GET_FILTERS(slug),
				prevFilters.map((filter) => {
					if (filter.id === id) {
						return {
							...filter,
							isActive
						}
					}
					return filter
				})
			)
		},
		onError: (error) => {
			toast.error(handleApiError(error))
		}
	})
}
