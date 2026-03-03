import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const toggleSubcategoryStatus = async (id: string) => {
	const { data } = await api.patch<Subcategory>(`/subcategories/${id}`)
	return data
}

export const useToggleSubcategoryStatusMutation = (id: string, slug: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_STATUS_SUBCATEGORY(id),
		mutationFn: () => toggleSubcategoryStatus(id),
		onSuccess: (updatedSubcategory) => {
			queryClient.setQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(slug),
				(rows = []) =>
					rows.map((row) =>
						row.id === updatedSubcategory.id ? updatedSubcategory : row
					)
			)
		}
	})
}

