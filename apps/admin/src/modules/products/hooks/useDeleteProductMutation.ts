import { useMutation } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import type { Product } from '../types/product.types'

const deleteProduct = async (id: string) => {
	const { data } = await api.delete<Product>(`/product/${id}`)
	return data
}

export const useDeleteProductMutation = (id: string) => {
	return useMutation({
		mutationKey: MUTATIONS.DELETE_PRODUCT(id),
		mutationFn: () => deleteProduct(id)
	})
}
