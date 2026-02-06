export const ROUTES = {
  // GENERAL
  HOME: '/',

  // AUTH
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // NAVIGATION
  CATEGORIES: '/categories',
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',

  // PROFILE
  ORDERS: '/profile/orders',
  WISHLIST: '/profile/wishlist',
  ADDRESS: '/profile/address',
  PASSWORD: '/profile/password',
  ACCOUNT_DETAIL: '/profile/account-detail'
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]
