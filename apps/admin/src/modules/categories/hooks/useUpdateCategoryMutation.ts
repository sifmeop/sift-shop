import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { CategorySchema } from '../schemas/createCategory.schema'
import type { Category } from '../types/category.types'

const updateCategory = async (id: string, body: CategorySchema) => {
	const { data } = await api.put<Category>(`/categories/${id}`, body)
	return data
}

export const useUpdateCategoryMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_CATEGORY(id),
		mutationFn: (body: CategorySchema) => updateCategory(id, body),
		onSuccess: (data) => {
			const prevCategories = queryClient.getQueryData<Category[]>(
				QUERIES.GET_CATEGORIES
			)

			queryClient.setQueryData(
				QUERIES.GET_CATEGORIES,
				prevCategories?.map((category) => {
					if (category.id === data.id) {
						return {
							...category,
							...data
						}
					}
					return category
				})
			)
		}
	})
}
