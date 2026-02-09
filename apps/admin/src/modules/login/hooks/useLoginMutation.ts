import { useMutation } from '@tanstack/react-query'
import { MUTATIONS } from '~/common/constants/mutations'
import { useAuth } from '~/common/contexts/AuthProvider'
import { AuthService } from '../api/auth.service'

export const useLoginMutation = () => {
	const { setUser } = useAuth()

	return useMutation({
		mutationKey: MUTATIONS.LOGIN,
		mutationFn: AuthService.login,
		onSuccess: (data) => {
			setUser(data)
		}
	})
}
