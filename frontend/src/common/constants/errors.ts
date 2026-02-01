export const ERROR_CAUSE = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const

export type ErrorCause = (typeof ERROR_CAUSE)[keyof typeof ERROR_CAUSE]

export const ERROR_MESSAGES: Record<ErrorCause, string> = {
  [ERROR_CAUSE.USER_NOT_FOUND]: 'User not found',
  [ERROR_CAUSE.INVALID_PASSWORD]: 'Invalid password',
  [ERROR_CAUSE.EMAIL_ALREADY_EXISTS]: 'This email is already registered',
  [ERROR_CAUSE.VALIDATION_ERROR]: 'Please check your input'
}
