import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '../types/category.types'

interface CategoryBody {
	name: string
	slug: string
}

const createCategory = async (body: CategoryBody) => {
	const { data } = await api.post<Category>('/categories', body)
	return data
}

export const useCreateCategoryMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.CREATE_CATEGORY,
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_CATEGORIES })
		}
	})
}

