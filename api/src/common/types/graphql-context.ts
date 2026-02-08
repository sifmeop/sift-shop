import { Request, Response } from 'express'
import 'express-session'

import { User } from '~/generated/prisma/client'

export interface GraphQLContext {
  req: Request & { user?: User }
  res: Response
}
