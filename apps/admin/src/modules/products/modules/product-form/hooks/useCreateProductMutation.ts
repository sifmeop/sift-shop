import { useMutation } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'

const createProduct = async (body: FormData) => {
	const { data } = await api.post('/products', body, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	return data
}

export const useCreateProductMutation = () => {
	return useMutation({
		mutationKey: MUTATIONS.CREATE_PRODUCT,
		mutationFn: createProduct
	})
}
