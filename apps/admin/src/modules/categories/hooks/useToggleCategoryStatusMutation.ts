import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '../types/category.types'

const toggleCategoryStatus = async (id: string) => {
	const { data } = await api.patch<Category>(`/categories/${id}`)
	return data
}

export const useToggleCategoryStatusMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_STATUS_CATEGORY(id),
		mutationFn: () => toggleCategoryStatus(id),
		onSuccess: (updatedCategory) => {
			queryClient.setQueryData<Category[]>(QUERIES.GET_CATEGORIES, (rows = []) =>
				rows.map((row) => (row.id === updatedCategory.id ? updatedCategory : row))
			)
		}
	})
}

