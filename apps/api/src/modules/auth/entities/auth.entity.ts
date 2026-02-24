import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from '@sift-shop/database'

import { AccountDetailsEntity } from '~/modules/user/entities/account-details.entity'

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

  @Field(() => AccountDetailsEntity, { nullable: true })
  accountDetails?: AccountDetailsEntity
}

@ObjectType()
export class SuccessEntity {
  @Field(() => Boolean)
  success: boolean
}
