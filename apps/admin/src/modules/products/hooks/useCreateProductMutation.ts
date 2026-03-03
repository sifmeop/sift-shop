import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'

const createProduct = async (body: FormData) => {
	const { data } = await api.post('/products', body, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return data
}

export const useCreateProductMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.CREATE_PRODUCT,
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_PRODUCTS })
		}
	})
}

