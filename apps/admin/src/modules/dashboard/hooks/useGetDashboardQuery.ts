import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { DashboardResponse } from '../types/dashboard.types'

const getDashboard = async () => {
	const { data } = await api.get<DashboardResponse>('/dashboard')
	return data
}

export const useGetDashboardQuery = () => {
	return useQuery({
		queryKey: QUERIES.GET_DASHBOARD,
		queryFn: getDashboard
	})
}

