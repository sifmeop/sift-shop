import { Field, ObjectType } from '@nestjs/graphql'
import { AccountDetail } from '@sift-shop/database'

@ObjectType()
export class AccountDetailsEntity implements Partial<AccountDetail> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  phone: string

  @Field()
  city: string

  @Field()
  country: string

  @Field(() => String, { nullable: true })
  state?: string | null

  @Field()
  address: string

  @Field()
  zipCode: string
}
