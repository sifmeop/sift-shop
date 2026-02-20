import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { NOVA_POST_BASE_URL } from '~/common/constants/common'
import { env } from '~/common/constants/env'

import { NovaPostState } from '../nova-post.types'

export const useNovaPostStore = create<NovaPostState>()(
  devtools((set, get) => ({
    token: null,
    tokenExpiresAt: null,
    setToken: (token) => set({ token }),
    getToken: async () => {
      const { token, tokenExpiresAt, fetchToken } = get()

      if (!token) {
        return await fetchToken()
      }

      const now = new Date()

      if (tokenExpiresAt && now > tokenExpiresAt) {
        return await fetchToken()
      }

      return token
    },
    fetchToken: async () => {
      try {
        const response = await fetch(
          NOVA_POST_BASE_URL +
            `/clients/authorization?apiKey=${env.NEXT_PUBLIC_NOVA_POST_API_KEY}`
        )

        if (!response.ok) {
          throw new Error('Failed to generate token')
        }

        const data = (await response.json()) as { jwt: string }

        const token = data.jwt
        const tokenExpiresAt = new Date()
        tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 1)

        set({ token, tokenExpiresAt })

        return data.jwt
      } catch (error) {
        console.debug(`Error generating token: ${error}`)
      }
    }
  }))
)
