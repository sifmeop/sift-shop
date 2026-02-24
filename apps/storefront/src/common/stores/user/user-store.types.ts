import { AuthEntity } from '~/common/lib/graphql/generated/graphql'

export type User = AuthEntity

interface State {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface Actions {
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
  setAccountDetails: (accountDetails: User['accountDetails']) => void
}

export type UserState = State & Actions
