import { env } from './env'

export const BASE_URL = new URL(env.NEXT_PUBLIC_API_URL).origin
