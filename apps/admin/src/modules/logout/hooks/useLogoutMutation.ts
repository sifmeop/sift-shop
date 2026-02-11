import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'

const logout = async () => {
	await api.post('/auth/logout')
}

export const useLogoutMutation = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationKey: MUTATIONS.LOGOUT,
		mutationFn: logout,
		onMutate: () => {
			navigate({ to: '/' })
		}
	})
}
