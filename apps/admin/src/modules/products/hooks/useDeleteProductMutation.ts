import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Product } from '../types/product.types'

const deleteProduct = async (id: string) => {
	const { data } = await api.delete<Product>(`/products/${id}`)
	return data
}

export const useDeleteProductMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_PRODUCT(id),
		mutationFn: () => deleteProduct(id),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: QUERIES.GET_PRODUCTS })

			const previousProducts = queryClient.getQueryData<Product[]>(
				QUERIES.GET_PRODUCTS
			)

			queryClient.setQueryData<Product[]>(QUERIES.GET_PRODUCTS, (products = []) =>
				products.filter((product) => product.id !== id)
			)

			return { previousProducts }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousProducts) {
				queryClient.setQueryData(QUERIES.GET_PRODUCTS, context.previousProducts)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_PRODUCTS })
		}
	})
}

