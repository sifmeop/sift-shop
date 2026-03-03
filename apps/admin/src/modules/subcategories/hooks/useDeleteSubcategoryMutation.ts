import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const deleteSubcategory = async (id: string) => {
	const { data } = await api.delete<Subcategory>(`/subcategories/${id}`)
	return data
}

export const useDeleteSubcategoryMutation = (id: string, slug: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_SUBCATEGORY(id),
		mutationFn: () => deleteSubcategory(id),
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: QUERIES.GET_SUBCATEGORIES(slug)
			})

			const previousSubcategories = queryClient.getQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(slug)
			)

			queryClient.setQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(slug),
				(rows = []) => rows.filter((row) => row.id !== id)
			)

			return { previousSubcategories }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousSubcategories) {
				queryClient.setQueryData(
					QUERIES.GET_SUBCATEGORIES(slug),
					context.previousSubcategories
				)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: QUERIES.GET_SUBCATEGORIES(slug)
			})
		}
	})
}

