import { env } from '../constants/env'

export const getImageUrl = (path: string) => {
  const base = env.NEXT_PUBLIC_IMAGE_BASE_URL
  return base + path
}
