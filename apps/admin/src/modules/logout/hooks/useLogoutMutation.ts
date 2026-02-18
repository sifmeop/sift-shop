import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { useAuth } from '~/common/contexts/auth'

const handleLogout = async () => {
	const { data } = await api.post('/auth/logout')
	return data
}

export const useLogoutMutation = () => {
	const { logout } = useAuth()
	const navigate = useNavigate()

	return useMutation({
		mutationKey: MUTATIONS.LOGOUT,
		mutationFn: handleLogout,
		onMutate: () => {
			logout()
			navigate({ to: '/' })
		}
	})
}
