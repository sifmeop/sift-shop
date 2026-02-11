import { useMutation } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { setAuthUser, type User } from '~/common/contexts/auth'
import type { LoginSchema } from '../schemas/login.schema'

const login = async (body: LoginSchema) => {
	const { data } = await api.post<User>('/auth/login', body)
	return data
}

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: MUTATIONS.LOGIN,
		mutationFn: login,
		onSuccess: (data) => {
			setAuthUser(data)
		}
	})
}
