import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Order } from '../types/order.types'

const getOrders = async () => {
	const { data } = await api.get<Order[]>('/orders')
	return data
}

export const useGetOrdersQuery = () => {
	return useQuery({
		queryKey: QUERIES.GET_ORDERS,
		queryFn: getOrders
	})
}

