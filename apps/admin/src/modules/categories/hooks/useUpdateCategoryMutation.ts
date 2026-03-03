import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '../types/category.types'

interface CategoryBody {
	name: string
	slug: string
}

const updateCategory = async (id: string, body: CategoryBody) => {
	const { data } = await api.put<Category>(`/categories/${id}`, body)
	return data
}

export const useUpdateCategoryMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_CATEGORY(id),
		mutationFn: (body: CategoryBody) => updateCategory(id, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_CATEGORIES })
		}
	})
}

