import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Product } from '../types/product.types'

const updateProduct = async (id: string, body: FormData) => {
	const { data } = await api.put<Product>(`/products/${id}`, body, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return data
}

export const useUpdateProductMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.UPDATE_PRODUCT(id),
		mutationFn: (body: FormData) => updateProduct(id, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_PRODUCTS })
		}
	})
}

