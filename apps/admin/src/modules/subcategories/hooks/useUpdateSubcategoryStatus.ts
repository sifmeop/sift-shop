import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Route } from '~/app/routes/_auth/categories/$slug'
import { api } from '~/common/api/axiosInstance'
import { handleApiError } from '~/common/api/errorHandler'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

interface UpdateSubcategoryStatusBody {
	isActive: boolean
}

const updateSubcategory = async (
	id: string,
	body: UpdateSubcategoryStatusBody
) => {
	const { data } = await api.patch<Subcategory>(`/subcategories/${id}`, body)
	return data
}

export const useUpdateSubcategoryStatus = (id: string) => {
	const { slug } = Route.useParams()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_STATUS_SUBCATEGORY(id),
		mutationFn: (body: UpdateSubcategoryStatusBody) =>
			updateSubcategory(id, body),
		onSuccess: (_, { isActive }) => {
			const prevCategories = queryClient.getQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(slug)
			)

			if (!prevCategories) return

			queryClient.setQueryData(
				QUERIES.GET_SUBCATEGORIES(slug),
				prevCategories.map((subcategory) => {
					if (subcategory.id === id) {
						return {
							...subcategory,
							isActive
						}
					}
					return subcategory
				})
			)
		},
		onError: (error) => {
			toast.error(handleApiError(error))
		}
	})
}
