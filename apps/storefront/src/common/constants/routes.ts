export const ROUTES = {
  // GENERAL
  HOME: '/',

  // AUTH
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // NAVIGATION
  CATEGORY: '/category',
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',

  // PROFILE
  ORDERS: '/profile/orders',
  WISHLIST: '/profile/wishlist',
  ACCOUNT_DETAIL: '/profile/account-detail',
  TWO_FACTOR_AUTH: '/profile/two-factor-auth',

  // CHECKOUT
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success'
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]
