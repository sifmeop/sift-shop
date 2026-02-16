import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/categories/$slug'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Subcategory } from '../types/subcategory.types'

const updateSubcategory = async (id: string, body: FormData) => {
	const { data } = await api.put<Subcategory>(
		`/subcategories/${id}/update`,
		body
	)
	return data
}

export const useUpdateSubcategoryMutation = (id: string) => {
	const queryClient = useQueryClient()
	const { slug } = Route.useParams()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_SUBCATEGORY(id),
		mutationFn: (body: FormData) => updateSubcategory(id, body),
		onSuccess: (data) => {
			const previousCategories = queryClient.getQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(slug)
			)

			queryClient.setQueryData(
				QUERIES.GET_SUBCATEGORIES(slug),
				previousCategories?.map((subcategory) => {
					if (subcategory.id === data.id) {
						return {
							...subcategory,
							...data
						}
					}
					return subcategory
				})
			)
		}
	})
}
