import { useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { onAuthStateChange } from './auth-state'
import { useAuth } from './AuthProvider'

export const useAuthStateWatcher = () => {
	const router = useRouter()
	const navigate = useNavigate()
	const { setUser } = useAuth()

	useEffect(() => {
		const unsubscribe = onAuthStateChange((user) => {
			setUser(user)
			router.invalidate()

			const searchParams = new URLSearchParams(window.location.search)
			const redirect = searchParams.get('redirect')

			if (user) {
				navigate({ to: redirect ?? '/dashboard' })
			} else {
				navigate({ to: '/' })
			}
		})

		return () => {
			unsubscribe()
		}
	}, [])
}
