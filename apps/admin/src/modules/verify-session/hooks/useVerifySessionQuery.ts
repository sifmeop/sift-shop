import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { User } from '~/common/contexts/auth'

const verifySession = async () => {
	const { data } = await api.get<User>('/auth/verify-session')

	return data
}

export const useVerifySessionQuery = () => {
	return useQuery({
		queryKey: QUERIES.VERIFY_SESSION,
		queryFn: verifySession,
		enabled: false
	})
}
