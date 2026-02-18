import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { AuthMethod, User, UserRole } from '@sift-shop/database'

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
  fullName: string

  @Field(() => String, { nullable: true })
  avatar: string | null

  @Field(() => Boolean)
  isTwoFactorEnabled: boolean

  @Field(() => Date)
  createdAt: Date
}

@ObjectType()
export class SuccessEntity {
  @Field(() => Boolean)
  success: boolean
}
