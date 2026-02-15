import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/filters/$slug'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Filter } from '../types/filters.types'

const updateFilter = async (id: string, body: any) => {
	const { data } = await api.put<Filter>(`/filters/${id}`, body)
	return data
}

export const useUpdateFilterMutation = (id: string) => {
	const { slug } = Route.useParams()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_FILTER(id),
		mutationFn: (body: any) => updateFilter(id, body),
		onSuccess: (data) => {
			const prevCategories = queryClient.getQueryData<Filter[]>(
				QUERIES.GET_FILTERS(slug)
			)

			queryClient.setQueryData(
				QUERIES.GET_FILTERS(slug),
				prevCategories?.map((filter) => {
					if (filter.id === data.id) {
						return data
					}
					return filter
				})
			)
		}
	})
}
