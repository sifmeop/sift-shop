interface State {
  token: string | null
  tokenExpiresAt: Date | null
}

interface Actions {
  setToken: (token: string | null) => void
  getToken: () => Promise<string>
  fetchToken: () => Promise<void>
}

export type NovaPostState = State & Actions
