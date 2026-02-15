import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/filters/$slug'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Filter } from '../types/filters.types'

interface UpdatePositionBody {
	old: number
	new: number
}

const updatePosition = async (slug: string, body: UpdatePositionBody) => {
	const { data } = await api.put<Filter[]>(`/filters/${slug}/position`, body)
	return data
}

export const useUpdatePositionMutation = () => {
	const { slug } = Route.useParams()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_POSITION,
		mutationFn: (body: UpdatePositionBody) => updatePosition(slug, body),
		onSuccess: (data) => {
			queryClient.setQueryData(QUERIES.GET_FILTERS(slug), data)
		}
	})
}
