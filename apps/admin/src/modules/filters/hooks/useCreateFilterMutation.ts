import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/filters/$slug'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Filter } from '../types/filters.types'

const createFilter = async (slug: string, body: any) => {
	const { data } = await api.post<Filter>(`/filters/${slug}`, body)
	return data
}

export const useCreateFilterMutation = () => {
	const { slug } = Route.useParams()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.CREATE_FILTER,
		mutationFn: (body: any) => createFilter(slug, body),
		onSuccess: (data) => {
			const prevFilters = queryClient.getQueryData<Filter[]>(
				QUERIES.GET_FILTERS(slug)
			)

			queryClient.setQueryData(
				QUERIES.GET_FILTERS(slug),
				prevFilters ? [...prevFilters, data] : []
			)
		}
	})
}
