import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SITE_URL: z.url()
  },

  client: {
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    NEXT_PUBLIC_IMAGE_BASE_URL: z.string(),
    NEXT_PUBLIC_SESSION_COOKIE_NAME: z.string(),
    NEXT_PUBLIC_NOVA_POST_API_KEY: z.string(),
    NEXT_PUBLIC_PUSHER_KEY: z.string(),
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string(),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production'])
  },

  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
    NEXT_PUBLIC_SESSION_COOKIE_NAME:
      process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME,
    NEXT_PUBLIC_NOVA_POST_API_KEY: process.env.NEXT_PUBLIC_NOVA_POST_API_KEY,
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV
  }
})
