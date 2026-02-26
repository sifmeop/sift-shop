import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TwoFactorSetupOutputEntity {
  @Field()
  secret: string

  @Field()
  otpAuthUrl: string
}
