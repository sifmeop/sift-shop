import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { useAuth, type User } from '~/common/contexts/auth'
import type { LoginSchema } from '../schemas/login.schema'

const login = async (body: LoginSchema) => {
	const { data } = await api.post<User>('/auth/login', body)
	return data
}

export const useLoginMutation = () => {
	const { setUser } = useAuth()
	const navigate = useNavigate()

	return useMutation({
		mutationKey: MUTATIONS.LOGIN,
		mutationFn: login,
		onSuccess: (data) => {
			setUser(data)
			navigate({ to: '/dashboard' })
		}
	})
}
