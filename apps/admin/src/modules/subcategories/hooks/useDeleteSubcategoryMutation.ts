import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/categories/$categoryId'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '~/modules/categories/types/category.types'
import type { Subcategory } from '../types/subcategory.types'

const deleteSubcategory = async (id: string) => {
	const { data } = await api.delete<Subcategory>(`/subcategories/${id}/delete`)
	return data
}

export const useDeleteSubcategoryMutation = (id: string) => {
	const queryClient = useQueryClient()
	const { categoryId } = Route.useParams()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_SUBCATEGORY(id),
		mutationFn: () => deleteSubcategory(id),
		onSuccess: (data) => {
			const prevSubcategories = queryClient.getQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(categoryId)
			)

			queryClient.setQueryData(
				QUERIES.GET_SUBCATEGORIES(categoryId),
				prevSubcategories?.filter((subcategory) => subcategory.id !== data.id)
			)

			const prevCategories = queryClient.getQueryData<Category[]>(
				QUERIES.GET_CATEGORIES
			)

			queryClient.setQueryData(
				QUERIES.GET_CATEGORIES,
				prevCategories?.map((category) => {
					if (category.id === data.categoryId) {
						return {
							...category,
							subcategoriesCount: category.subcategoriesCount - 1
						}
					}
					return category
				})
			)
		}
	})
}
