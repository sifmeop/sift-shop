import { User } from '@sift-shop/database'
import { Request, Response } from 'express'
import 'express-session'

export interface GraphQLContext {
  req: Request & { user?: User }
  res: Response
}
