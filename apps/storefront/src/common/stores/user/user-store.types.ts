export interface User {
  id: string
  email: string
  fullName: string
  avatar?: string | null
  isTwoFactorEnabled: boolean
  createdAt: string
}

interface State {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface Actions {
  setUser: (user: User) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

export type UserState = State & Actions
