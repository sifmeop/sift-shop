import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const createSubcategory = async (slug: string, body: FormData) => {
	const { data } = await api.post<Subcategory>(`/subcategories/${slug}`, body, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return data
}

export const useCreateSubcategoryMutation = (slug: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.CREATE_SUBCATEGORY,
		mutationFn: (body: FormData) => createSubcategory(slug, body),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERIES.GET_SUBCATEGORIES(slug)
			})
		}
	})
}

