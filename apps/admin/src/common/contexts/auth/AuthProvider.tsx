import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'
import { useVerifySessionQuery } from '~/modules/verify-session'

export interface User {
	id: string
	email: string
}

export interface AuthContext {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	setUser: (user: User | null) => void
	logout: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const { refetch } = useVerifySessionQuery()

	const logout = useCallback(async () => {
		setUser(null)
	}, [])

	useEffect(() => {
		const initAuth = async () => {
			try {
				const session = await cookieStore.get('session')

				if (!session) return

				const { data, error } = await refetch()

				if (error) {
					await cookieStore.delete('session')
					return
				}

				if (data) {
					setUser(data)
				}
			} catch (error) {
				cookieStore.delete('session')
				console.error('Auth initialization failed:', error)
				setUser(null)
			} finally {
				setIsLoading(false)
			}
		}

		initAuth()
	}, [])

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading,
			setUser,
			logout
		}),
		[user, isLoading, logout]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within AuthProvider')
	return context
}
