import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

import { AuthMethod, User, UserRole } from '~/generated/prisma/client'

registerEnumType(AuthMethod, {
  name: 'AuthMethod',
  description: 'Authentication method'
})

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role'
})

@ObjectType()
export class AuthEntity implements Partial<User> {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  fullName: string

  @Field(() => AuthMethod)
  method: AuthMethod

  @Field(() => String, { nullable: true })
  avatar: string | null

  @Field(() => Boolean)
  isTwoFactorEnabled: boolean

  @Field(() => Boolean)
  isVerified: boolean

  @Field(() => UserRole)
  role: UserRole

  @Field(() => Date)
  createdAt: Date
}
