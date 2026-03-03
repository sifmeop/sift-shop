import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { Filter, FilterBody } from '../types/filters.types'

const createFilter = async (subcategorySlug: string, body: FilterBody) => {
	const { data } = await api.post<Filter>(`/filters/${subcategorySlug}`, body)
	return data
}

interface CreateFilterVariables {
	subcategorySlug: string
	body: FilterBody
}

export const useCreateFilterMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create-filter'],
		mutationFn: ({ subcategorySlug, body }: CreateFilterVariables) =>
			createFilter(subcategorySlug, body),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-filters-page']
			})
		}
	})
}
