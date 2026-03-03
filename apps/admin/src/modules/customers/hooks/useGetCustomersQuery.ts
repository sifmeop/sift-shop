import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Customer } from '../types/customer.types'

const getCustomers = async () => {
	const { data } = await api.get<Customer[]>('/customers')
	return data
}

export const useGetCustomersQuery = () => {
	return useQuery({
		queryKey: QUERIES.GET_CUSTOMERS,
		queryFn: getCustomers
	})
}

