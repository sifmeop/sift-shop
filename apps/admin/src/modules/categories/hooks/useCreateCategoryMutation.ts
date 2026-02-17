import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { CategorySchema } from '../schemas/createCategory.schema'
import type { Category } from '../types/category.types'

const createCategory = async (body: CategorySchema) => {
	const { data } = await api.post<Category>('/categories', body)
	return data
}

export const useCreateCategoryMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.CREATE_CATEGORY,
		mutationFn: createCategory,
		onSuccess: (data) => {
			const prevCategories = queryClient.getQueryData<Category[]>(
				QUERIES.GET_CATEGORIES
			)

			queryClient.setQueryData(
				QUERIES.GET_CATEGORIES,
				prevCategories ? [data, ...prevCategories] : []
			)
		}
	})
}
