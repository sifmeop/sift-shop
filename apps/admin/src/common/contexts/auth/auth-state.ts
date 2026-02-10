import type { User } from './AuthProvider'

type AuthStateCallback = (user: User | null) => void

let currentUser: User | null = null
const subscribers = new Set<AuthStateCallback>()

export const setAuthUser = (user: User | null) => {
	currentUser = user

	for (const callback of subscribers) {
		callback(user)
	}
}

export const onAuthStateChange = (callback: AuthStateCallback) => {
	callback(currentUser)
	subscribers.add(callback)

	return () => subscribers.delete(callback)
}
