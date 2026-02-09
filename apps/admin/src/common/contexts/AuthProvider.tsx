import { createContext, useContext, useMemo, useState } from 'react'

export interface User {
	id: string
}

export interface UserContext {
	user: User | null
}

interface AuthContext extends UserContext {
	setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null)

	const value = useMemo(
		() => ({
			user,
			setUser
		}),
		[user]
	)

	return <AuthContext value={value}>{children}</AuthContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider')
	}

	return context
}
