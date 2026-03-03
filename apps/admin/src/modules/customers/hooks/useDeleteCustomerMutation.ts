import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Customer } from '../types/customer.types'

const deleteCustomer = async (id: string) => {
	const { data } = await api.delete<Customer>(`/customers/${id}`)
	return data
}

export const useDeleteCustomerMutation = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_CUSTOMER(id),
		mutationFn: () => deleteCustomer(id),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: QUERIES.GET_CUSTOMERS })

			const previousCustomers = queryClient.getQueryData<Customer[]>(
				QUERIES.GET_CUSTOMERS
			)

			queryClient.setQueryData<Customer[]>(QUERIES.GET_CUSTOMERS, (rows = []) =>
				rows.filter((row) => row.id !== id)
			)

			return { previousCustomers }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousCustomers) {
				queryClient.setQueryData(QUERIES.GET_CUSTOMERS, context.previousCustomers)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: QUERIES.GET_CUSTOMERS })
		}
	})
}

