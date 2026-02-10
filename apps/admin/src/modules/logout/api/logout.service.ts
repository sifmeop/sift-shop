import { api } from '~/common/api/axiosInstance'

export const LogoutService = {
	async logout() {
		await api.post('/auth/logout')
	}
}
