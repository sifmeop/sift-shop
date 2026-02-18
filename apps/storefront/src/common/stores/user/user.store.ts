import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { UserState } from './user-store.types'

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    setLoading: (isLoading) => set({ isLoading })
  }))
)
