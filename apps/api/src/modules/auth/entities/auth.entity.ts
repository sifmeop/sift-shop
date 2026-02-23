import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from '@sift-shop/database'

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
