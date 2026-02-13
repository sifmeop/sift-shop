import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'

const getProducts = async () => {
	const { data } = await api.get('/products')
	return data
}

export const useGetProductsQuery = () => {
	return useQuery({
		queryKey: QUERIES.GET_PRODUCTS,
		queryFn: getProducts
	})
}
