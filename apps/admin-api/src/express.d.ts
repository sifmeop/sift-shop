import { User } from '@sift-shop/database'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
