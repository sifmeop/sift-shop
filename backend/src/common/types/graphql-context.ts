import { Request, Response } from 'express'
import 'express-session'

export interface GraphQLContext {
  req: Request
  res: Response
}
