import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '~/common/api/axiosInstance'
import { handleApiError } from '~/common/api/errorHandler'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '../types/category.types'

interface UpdateCategoryStatusBody {
	isActive: boolean
}

const updateCategory = async (id: string, body: UpdateCategoryStatusBody) => {
	const { data } = await api.patch<Category>(`/categories/${id}`, body)
	return data
}

export const useUpdateCategoryStatus = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_STATUS_CATEGORY(id),
		mutationFn: (body: UpdateCategoryStatusBody) => updateCategory(id, body),
		onSuccess: (_, { isActive }) => {
			const prevCategories = queryClient.getQueryData<Category[]>(
				QUERIES.GET_CATEGORIES
			)

			if (!prevCategories) return

			queryClient.setQueryData(
				QUERIES.GET_CATEGORIES,
				prevCategories.map((category) => {
					if (category.id === id) {
						return {
							...category,
							isActive
						}
					}
					return category
				})
			)
		},
		onError: (error) => {
			toast.error(handleApiError(error))
		}
	})
}
