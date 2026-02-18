import { useUserStore } from '../stores/user'

export const useIsAuthenticated = () => {
  return useUserStore((state) => state.isAuthenticated)
}
