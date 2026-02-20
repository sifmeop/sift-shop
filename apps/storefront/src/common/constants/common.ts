import { env } from './env'

export const BASE_URL = new URL(env.NEXT_PUBLIC_API_URL).origin
export const NOVA_POST_BASE_URL = 'https://api.novaposhta.ua/v.1.0'
