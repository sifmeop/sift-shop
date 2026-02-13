import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Route } from '~/app/routes/_auth/categories/$categoryId'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Category } from '~/modules/categories/types/category.types'
import type { Subcategory } from '../types/subcategory.types'

const createSubcategory = async (categoryId: string, body: FormData) => {
	const { data } = await api.post<Subcategory>(
		`/subcategories/${categoryId}/create`,
		body,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	)
	return data
}

export const useCreateSubcategoryMutation = () => {
	const queryClient = useQueryClient()
	const { categoryId } = Route.useParams()

	return useMutation({
		mutationKey: MUTATIONS.CREATE_SUBCATEGORY,
		mutationFn: (body: FormData) => createSubcategory(categoryId, body),
		onSuccess: (data) => {
			const prevSubcategories = queryClient.getQueryData<Subcategory[]>(
				QUERIES.GET_SUBCATEGORIES(categoryId)
			)

			queryClient.setQueryData(
				QUERIES.GET_SUBCATEGORIES(categoryId),
				prevSubcategories
					? [
							...prevSubcategories,
							{
								...data,
								productsCount: 0
							}
						]
					: []
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
							subcategoriesCount: category.subcategoriesCount + 1
						}
					}
					return category
				})
			)
		}
	})
}
