import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { MUTATIONS } from '~/common/constants/mutations'
import { LogoutService } from '../api/logout.service'

export const useLogoutMutation = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationKey: MUTATIONS.LOGOUT,
		mutationFn: LogoutService.logout,
		onMutate: () => {
			navigate({ to: '/' })
		}
	})
}
