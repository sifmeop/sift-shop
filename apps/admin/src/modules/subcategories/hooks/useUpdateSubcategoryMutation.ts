import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const updateSubcategory = async (id: string, body: FormData) => {
	const { data } = await api.put<Subcategory>(`/subcategories/${id}`, body, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return data
}

export const useUpdateSubcategoryMutation = (id: string, slug: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_SUBCATEGORY(id),
		mutationFn: (body: FormData) => updateSubcategory(id, body),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERIES.GET_SUBCATEGORIES(slug)
			})
		}
	})
}

