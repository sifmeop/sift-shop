import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateOrderEntity {
  @Field()
  url: string
}
