import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '../types/category.types'

const deleteCategory = async (id: string) => {
	const { data } = await api.delete<Category>(`/categories/${id}`)
	return data
}

export const useDeleteCategoryMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_CATEGORY(id),
		mutationFn: () => deleteCategory(id),
		onSuccess: (data) => {
			const prevCategories = queryClient.getQueryData<Category[]>(
				QUERIES.GET_CATEGORIES
			)

			queryClient.setQueryData(
				QUERIES.GET_CATEGORIES,
				prevCategories?.filter((category) => category.id !== data.id)
			)

			queryClient.setQueryData(QUERIES.GET_SUBCATEGORIES(data.id), [])
		}
	})
}
