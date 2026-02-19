import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    NEXT_PUBLIC_IMAGE_BASE_URL: z.string(),
    NEXT_PUBLIC_SESSION_COOKIE_NAME: z.string()
  },

  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
    NEXT_PUBLIC_SESSION_COOKIE_NAME: process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME
  }
})
