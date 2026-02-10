import { useAuth } from '../contexts/auth'

export const useUser = () => {
	const { user } = useAuth()
	return user!
}
