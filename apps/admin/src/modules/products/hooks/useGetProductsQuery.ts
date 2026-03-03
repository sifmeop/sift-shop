import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Product } from '../types/product.types'

const getProducts = async () => {
	const { data } = await api.get<Product[]>('/products')
	return data
}

export const useGetProductsQuery = () => {
	return useQuery({
		queryKey: QUERIES.GET_PRODUCTS,
		queryFn: getProducts
	})
}

