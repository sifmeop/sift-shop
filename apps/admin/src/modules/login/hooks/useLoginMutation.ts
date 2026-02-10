import { useMutation } from '@tanstack/react-query'
import { MUTATIONS } from '~/common/constants/mutations'
import { setAuthUser } from '~/common/contexts/auth'
import { AuthService } from '../api/auth.service'

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: MUTATIONS.LOGIN,
		mutationFn: AuthService.login,
		onSuccess: (data) => {
			setAuthUser(data)
		}
	})
}
