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
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: QUERIES.GET_CATEGORIES })

			const previousCategories = queryClient.getQueryData<Category[]>(
				QUERIES.GET_CATEGORIES
			)

			queryClient.setQueryData<Category[]>(QUERIES.GET_CATEGORIES, (rows = []) =>
				rows.filter((row) => row.id !== id)
			)

			return { previousCategories }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousCategories) {
				queryClient.setQueryData(QUERIES.GET_CATEGORIES, context.previousCategories)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_CATEGORIES })
		}
	})
}

