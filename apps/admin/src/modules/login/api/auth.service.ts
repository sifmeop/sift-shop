import { api } from '~/common/api/axiosInstance'
import type { User } from '~/common/contexts/auth'
import type { LoginSchema } from '../schemas/login.schema'

export const AuthService = {
	async login(body: LoginSchema) {
		const { data } = await api.post<User>('/auth/login', body)
		return data
	}
}
