import { applyDecorators, UseGuards } from '@nestjs/common'

import { UserRole } from '~/generated/prisma/enums'
import { AuthGuard } from '~/modules/auth/guards/auth.guard'
import { RolesGuard } from '~/modules/auth/guards/roles.guard'

import { Roles } from './roles.decorator'

export const Authorization = (...roles: UserRole[]) => {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
  }

  return applyDecorators(UseGuards(AuthGuard))
}
